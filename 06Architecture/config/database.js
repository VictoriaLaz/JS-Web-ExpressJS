const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('../models/user');


module.exports = config => {
    mongoose.connect(config.dbPath, {
        useMongoClient:true
    });
    const db = mongoose.connection;
    db.once('open', err => {
        if(err) throw err;
        User.seedAdminUser().then(()=>{
            console.log('Database ready');
        }).catch((reason)=>{
            console.log(reason)
        });
        
    });
    db.on('error', reason => {
        console.log('OOOPS');
        console.log(reason);
    });
    
}
