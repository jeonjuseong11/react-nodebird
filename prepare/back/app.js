const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");

const db = require("./models");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const passportConfig = require("./passport");
const morgan = require("morgan");

dotenv.config(); //process.env.이름을 하면 .env파일로 가서 그 값으로 치환됨

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.log(console.error));
passportConfig();
app.use(morgan("dev"));
app.use(
  cors({
    origin: true, //보낸 곳의 주소가 자동으로 들어가 편리
    credentials: true, //쿠키를 같이 전달할 때
  })
);
app.use(express.json()); //json 형식의 데이터가 들어왔을 때 req.body안에 넣어줌
app.use(express.urlencoded({ extended: true })); //form submit 했을때 데이터를 req.body에 넣어줌
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET, //쿠키의 랜덤한 문자열을 받아오기 위한 키값?
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.get -> 가져오다
// app.post-> 생성하다
// app.put -> 전체 수정
// app.delete -> 제거
// app.patch -> 부분 수정
// app.options -> 찔러보기
// app.head -> 헤더만 가져오기

app.get("/", (req, res) => {
  res.send("hello express");
});
app.get("/", (req, res) => {
  res.send("hello api");
});
app.use("/posts", postsRouter);

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행 중!");
});
