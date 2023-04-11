const express = require("express");
const bcrypt = require("bcrypt"); //암호화 라이브러리;
const passport = require("passport");

const router = express.Router();

const { User, Post } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.get("/", async (req, res, next) => {
  //GET /user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ["password"] }, //원하는 정보만 받기
        include: [
          {
            model: Post, //게시글에 대한 숫자만 셀거기 때문에 id만 가져옴
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword); //사용자가 있으면 보내고
    } else {
      res.status(200).json(null); //없으면 보내지 않는다
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  //POST /user/login
  //미들웨어 확장
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      //서버쪽 에러
      console.error(err);
      return next(err);
    }
    if (info) {
      //클라이언트쪽 에러
      return res.status(401).send(info.reason); //401 허가되지 않음
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr); //로그인 에러 처리 잘 일어나지 않음
      }
      const fullUserWithoutPassword = await User.findOne({
        //비밀번호를 제외한 사용자 정보
        where: { id: user.id },
        attributes: { exclude: ["password"] }, //원하는 정보만 받기
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});
router.post("/", isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email, //기존에 사용자가 있는지 확인하는것
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용 중인 아이디입니다"); //중복 되었다면 이미 사용중이라고 return
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //숫자가 높을 수록 암호화가 심해진다.
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); //status 500 = 서버오류
  }
});
router.post("/logout", isLoggedIn, (req, res) => {
  //로그아웃 라우터
  console.log(req.user);
  req.logout(() => {
    res.redirect("/");
  });
  // req.session.destroy();
  // res.send("ok");
});
module.exports = router;
