const Product = require('mongoose').model('Product')
const Order = require('mongoose').model('Order')
module.exports = {
    getAddProductView:(req, res)=>{
        res.render('products/create-product')
    },
    addProduct:(req, res)=>{
        let params = req.body;
        let parsedToppings = params.textArea.split(',');
        if(params.size<17||params.size>24){
            res.locals.globalError = 'Size must be between 17 and 24 cm.'
            res.render('products/create-product')
        }
        else{
        let newProduct = {
            category: params.category,
            imageUrl: params.imageUrl,
            size: params.size,
            toppings: parsedToppings,
        }
        
        Product.create(newProduct).then(h=>{
            res.render('products/create-product', {successMessage: 'Product Generated!'})

        }).catch(e => {
            res.locals.globalError = e.message
            res.render('products/create-product')
          })
        }
    },
    
    }
