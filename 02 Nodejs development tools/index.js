const http=require('http');
const url = require('url');
const port = 9182;
const handlers = require('./handlers/index');

http.createServer((req, res)=>{
    req.pathname = url.parse(req.url).pathname;

    for (let handler of handlers){
        let response = handler(req, res);
        if(response !==true);
        break;
    }
}).listen(port);