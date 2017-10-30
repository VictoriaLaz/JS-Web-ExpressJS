const Product = require('mongoose').model('Product')
const Order = require('mongoose').model('Order')
module.exports={
    customizeOrderGet: (req, res)=>{
        let targetProduct = req.query.id
        
        Product.findById(targetProduct).then(selectedProduct=>{
            let toppings = selectedProduct.toppings;
            
          res.render('orders/customize-order', {toppings, targetProduct})  
        }).catch(e => {
            res.locals.globalError = e.message
            res.render('orders/customize-order')
          
        })
    },
    customizeOrderPost:(req, res)=>{
        let params = req.body;
        console.log(req.body);
        let userId = req.user._id
        let currentToppings = Object.keys(req.body);
        let key = 'product_id';
        currentToppings.shift();
        let newOrder = {
            creator: userId,
            product: req.body.product_id,
            date: Date.now(),
            toppings: currentToppings,
        }
        Order.create(newOrder).then(order=>{
            Order.findById(order._id).populate('product').then(o=>{
                res.render('orders/order-details',{o})
            })
        })
    }
}