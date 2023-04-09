const express = require("express");
const db = require("./models");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const cors = require("cors");

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.log(console.error));

app.use(
  cors({
    origin: true, //보낸 곳의 주소가 자동으로 들어가 편리
    credentials: false, //
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //form데이터 처리 방법
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
app.get("/posts", (req, res) => {
  res.json([
    {
      id: 1,
      content: "hello",
    },
    {
      id: 2,
      content: "hello2",
    },
    {
      id: 3,
      content: "hello3",
    },
  ]);
});
app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(3065, () => {
  console.log("서버 실행 중!");
});
