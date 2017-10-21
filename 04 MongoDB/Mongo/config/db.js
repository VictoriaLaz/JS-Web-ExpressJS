const mongoose = require('mongoose');
const path = 'mongodb://localhost:27017/imagesDB';
mongoose.Promise = global.Promise;

module.exports = mongoose.connect(path, {
    useMongoClient:true
})