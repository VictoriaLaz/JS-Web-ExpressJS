const fs = require('fs');
const Tag = require('../models/TagSchema');

module.exports = (req, res) => {
  if (req.pathname === '/search') {
   
    Tag.find({}).populate('images').then((data)=>{
      console.log(data);

      let images = [];

      for(let tag of data){
        for(let image of tag.images){
          images.push(image.imageUrl)
        }
      }

      let uniqueArray = images.filter(function(elem, pos){
        return images.indexOf(elem) == pos;
      });

      fs.readFile('../views/results.html', (err, html)=>{
        if(err){
          console.log(err);
          return;
        }

        res.writeHead(200,{
          'Content-Type':'text/html'
        });
        
      })
    })
  } else {
    return true
  }
}
