const express = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt"); //암호화 라이브러리
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email, //기존에 사용자가 있는지 확인하는것
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다"); //중복 되었다면 이미 사용중이라고 return
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12); //숫자가 높을 수록 암호화가 심해진다.
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

module.exports = router;
