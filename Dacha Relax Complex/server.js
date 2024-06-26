const http = require('http');
const fs = require('fs');
const path = require('path'); 
const mime = require('mime-types'); 

const hostname = '127.0.0.1'; 
const port = 3000; 

const server = http.createServer((req, res) => {
const reqUrl = req.url; 
let filePath = path.join(__dirname, 'front', reqUrl); 
if(reqUrl=== '/data')
 {
 let data = {
   color: 'yellow',
   id: 8,
   description: 'проверка',
   header: 'ПРОВЕРКА',
   price: '11111'
 };
 let jsonData = JSON.stringify(data);
 res.end(jsonData);
 }
  else if (reqUrl === '/') { 
    filePath = path.join(__dirname, 'front', 'лп.html');
    fs.access(filePath, fs.constants.F_OK, (err) => { 
      if (err) {
        res.statusCode = 404;
        res.end('File not found');
        return;
      }
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('Error reading file');
          return;
        }
        const fileExtension = path.extname(filePath); 
        const mimeType = mime.lookup(fileExtension); 
        res.statusCode = 200; 
        res.setHeader('Content-Type', mimeType); 
        res.end(data);
      });
    });
  }
  else 
  {
    fs.access(filePath, fs.constants.F_OK, (err) => { 
    if (err) {
      res.statusCode = 404;
      res.end('File not found');
      return;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error reading file');
        return;
      }
      const fileExtension = path.extname(filePath); 
      const mimeType = mime.lookup(fileExtension); 
      res.statusCode = 200; 
      res.setHeader('Content-Type', mimeType); 
      res.end(data);
    });
  });
}
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
