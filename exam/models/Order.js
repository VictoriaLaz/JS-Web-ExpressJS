const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const orderSchema = new mongoose.Schema({
    creator: { type: ObjectId, ref: 'User',required: true},
    product: { type: ObjectId, ref: 'Product', required:true},
    date: { type: mongoose.Schema.Types.Date, required:true },
    toppings: [{ type: mongoose.Schema.Types.String }],
    status:{type:mongoose.Schema.Types.String, default:'Pending'}
});

module.exports = mongoose.model('Order', orderSchema);
