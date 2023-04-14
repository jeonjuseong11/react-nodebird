const express = require("express");
const multer = require("multer"); //파일 업로드를 도와주는 라이브러리?
const path = require("path"); //업로드한 파일이름 추출
const fs = require("fs"); //filestsyem을 조작할 수 있음

const { Post, Comment, Image, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.accessSync("uploads"); //upload폴더 있는지 검사
} catch (error) {
  console.error("uploads 폴더가 없어 생성합니다");
  fs.mkdirSync("uploads"); //upload 폴도 생성
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      //이미지이름.png
      const ext = path.extname(file.originalname); //확장자 추출(png)
      const basename = path.basename(file.originalname, ext); //이미지이름
      done(null, basename + "_" + new Date().getTime() + ext); //이미지이름12351232.png 같은 파일명 덮어쓰기를 방지하기 위해서 시간을 넣어줌
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  // POST /post
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (Array.isArray(req.body.image)) {
      //이미지를 여러개 올리면 배열로 들어옴
      const images = await Promise.all(
        req.body.image.map((image) => Image.create({ src: image })) //db에 파일 주소 저장
      );
      await post.addImages(images);
    } else {
      //아니면 png로 들어옴
      const image = await Image.create({ src: req.body.image });
      await post.addImages(image);
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post(
  "/images",
  isLoggedIn,
  upload.array("image"), //이미지를 여러개 올릴수 있기 때문에 array로 한장만 올릴거면 single, 입력받는 곳이 2개이상 있으면 fills
  (req, res, next) => {
    //POST /post/images
    console.log(req.files);
    res.json(req.files.map((v) => v.filename)); //파일명 다시 프론트로 전달
  }
);

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  //POST /post/1/comment
  try {
    const post = await Post.findOne({
      //게시물이 존재하는지 확인
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글 입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  //PATCH /post/1/like
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.delete("/:postId/unlike", isLoggedIn, async (req, res, next) => {
  //DELETE /post/1/like
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  // DELETE /post/10
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
