const Product = require('mongoose').model('Product')

module.exports = {
    index: (req, res) => {
        Product.find({}).then(doners => {
          
            let beefDoners = [];
            let chickenDoners = [];
            let lambDoners = [];
            for (let doner of doners) {
                if (doner.category === 'chicken') {
                    chickenDoners.push(doner)
                } else if (doner.category === 'beef') {
                    beefDoners.push(doner)
                } else {
                    lambDoners.push(doner);
                }
            }
            
            res.render('home/index', {beefDoners, chickenDoners, lambDoners});
        })
    },
    about: (req, res) => {
        res.render('home/about');
    }
};