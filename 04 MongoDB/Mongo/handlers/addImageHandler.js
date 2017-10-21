const formidable = require('formidable');
const fs = require('fs');
const Image = require('../models/ImageSchema');
const Tag = require('../models/TagSchema';)

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

function addImage (req, res){
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, file)=>{
    if(err){
      console.log(err);
      return;
    }
    fields.tags = fields.tagsID.split(',');
    fields.tags.pop();
    delete fields.tagsID;
   
    Image.create(fields)
    .then((image)=>{
      let targetedTags = image.tags;
      Tag.update({_id:{$in:targetedTags}}, {$push:{images:image._id}}, {multi:true})
      .then((resolve)=>{
        console.log(resolve)
      }) 
      displayHome(res)
    }).catch((err)=>{
      console.log(err);
      return;
    })
  })
}
module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}
