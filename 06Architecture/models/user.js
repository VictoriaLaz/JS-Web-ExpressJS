const mongoose = require('mongoose');
const encryptiion = require('../utilities/encryption');

let userSchema = new mongoose.Schema({
    userName: {type: mongoose.Schema.Types.String, required: true, unique: true},
    hashedPassword: {type: mongoose.Schema.Types.String, required: true},
    firstName:{type: mongoose.Schema.Types.String},
    lastName:{type: mongoose.Schema.Types.String},
    salt:{type: mongoose.Schema.Types.String, required: true},
    roles:[{type: mongoose.Schema.Types.String}]
})
userSchema.method({
    authenticate: function(password){
        return encryptiion.generateHashedPassword(this.salt, password) === this.hashedPassword;
    }
})

const User = mongoose.model('User', userSchema);
User.seedAdminUser = async ()=>{
    try{
        let users = await User.find({})
        if(users.length >0){
            return;
        }
        const salt = encryptiion.generateSalt();
        const hashedPass = encryptiion.generateHashedPassword(salt, 'Victoria');
        return User.create({
            userName: 'Admin',
            salt,
            hashedPassword: hashedPass,
            roles: ['Admin']
        })
    }catch(err){
        console.log(err)
    }   
}
module.exports = User;