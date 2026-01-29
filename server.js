const express = require('express');
const app = express();
const path = require('path');
const port = 8080; // App Runner 기본 포트

// 현재 디렉토리의 모든 파일(HTML, CSS, JS)을 정적 파일로 제공
app.use(express.static(__dirname));

// 루트 경로 접속 시 index.html 전달
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Game app listening at http://localhost:${port}`);
});
