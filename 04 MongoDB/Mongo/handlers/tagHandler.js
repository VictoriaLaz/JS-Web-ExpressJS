const formidable = require('formidable');
const fs = require('fs');
let Tag = require('../models/TagSchema');

function displayHome(res){
  fs.readFile('./views/index.html', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    let dispalyTags = ''

    Tag.find({}).then(tags => {
      for (let tag of tags) {
        dispalyTags += `<div class='tag' id="${tag._id}">${tag.tagName}</div>`
      }
      data = data
        .toString()
        .replace(`<div class='replaceMe'></div>`, dispalyTags)
      res.end(data)
    })
  })
}
module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {

    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, file)=>{
      if(err){
        console.log(err);
        return;
      }
      Tag.create(fields).then((tag)=>{
        console.log(tag);
        displayHome(res);
      }).catch((err)=>{
        console.log(err);
        return;
      })
    })
  } else {
    return true
  }
}
