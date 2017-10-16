const fs = require('fs');

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
    } else{
        return true;
    }
}