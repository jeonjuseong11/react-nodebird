const express = require("express");

const { Post, Image, Comment, User } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  //GET /post
  try {
    const posts = await Post.findAll({
      // where: { id: lastId }, //offset 대신 사용함
      limit: 10,
      // offset: 100, //실무에서는 잘 안쓴다 101~110
      //offset은 글이 삭제 추가 되면 문제가 발생함
      order: [
        ["createdAt", "DESC"], //게시글 정렬
        [Comment, "createdAt", "DESC"], //댓글 정렬
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
      ],
    });
    console.log(posts); //실행 확인 용
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
