const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  if (req.method === "GET") {
    if (req.url === "/api/posts") {
    }
  } else if (req.method === "POST") {
  } else if (req.method === "DELETE") {
  }
  res.write("<h1>Hello node1</h1>");
  res.end("Hello node5");
});
server.listen(3065, () => {
  console.log("서버 실행 중");
});
