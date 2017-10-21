const fs = require('fs');

let fileType = (string)=>{
    let dataTypes = {
        ".css":'text/scc',
    }
}

let favHandler = (req, res)=>{
    fs.readFile('../public/images/favicon.ico', (err, data)=>{
        if(err){
            console.log(err);
            return;
        }
        res.writeHead(200, {
            'Content-Type':'image/x-icon'
        })
        res.write(data);
        res.end();
    })
}

module.exports = (req, res)=>{
    if(req.pathname === '/favicon.ico'&& req.method === 'GET'){
        favHandler(req, res);       
    } else if(req.pathname.startsWith('/public/')&&req.method === 'GET'){
        fs.readFile('.' + req.pathname, (err, data)=>{
            if(err){
                console.log(err);
                return;
            }
            res.writeHead(200, {
                'Content-Type':fileType(req.pathname)
            })
        })
    }else{
        res.end();
    }
}