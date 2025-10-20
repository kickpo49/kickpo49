const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Express 서버 실행 중!');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: '안녕하세요!', timestamp: new Date() });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express 서버가 ${PORT}번 포트에서 실행 중입니다`);
});