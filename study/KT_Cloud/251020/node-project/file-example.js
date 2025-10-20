const fs = require('fs');

// 파일 쓰기
fs.writeFileSync('test.txt', '안녕하세요! Node.js로 파일을 작성했습니다.');
console.log('파일이 생성되었습니다!');

// 파일 읽기
const data = fs.readFileSync('test.txt', 'utf-8');
console.log('파일 내용:', data);