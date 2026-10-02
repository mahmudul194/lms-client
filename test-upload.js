const fs = require('fs');
fs.writeFileSync('test.png', 'fake image content');
const formData = new FormData();
const blob = new Blob(['fake image content'], { type: 'image/png' });
formData.append('file', blob, 'test.png');
fetch('http://localhost:8000/upload', {
  method: 'POST',
  body: formData
}).then(r => r.json()).then(console.log).catch(console.error);
