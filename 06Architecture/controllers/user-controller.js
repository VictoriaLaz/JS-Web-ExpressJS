const encryption = require('../utilities/encryption');
const User = require('mongoose').model('User');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async (req, res) => {
        const reqUser = req.body;
        const salt = encryption.generateSalt();
        const hashedPassword = encryption.generateHashedPassword(salt, reqUser.password);
        try {
            const user = await User.create({
                userName : reqUser.userName,
                salt: salt,
                hashedPassword,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                roles: [] 
            });
            req.logIn(user, (err, user)=>{
                if(err){
                    res.locals.globalError = err;
                    res.render('users/register', user);
                }else{
                    res.redirect('/');
                }
            })
        } catch (err) {
            console.log(err);
            res.locals.globalError = err;
            res.render('users/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) =>{
        res.render('users/login')
    },
    loginPost: async (req, res) =>{
        const reqUser = req.body;
        try {
            const user = await User.findOne({userName: reqUser.userName});
            if(!user){
                errorHandler('Invalid user data')
                return;
            }
            if(!user.authenticate(reqUser.password)){
                errorHandler('Invalid password')
            }
            req.logIn(user, (err, user)=>{
                if(err){
                    errorHandler(err)
                }else{
                    res.redirect('/');
                }
            })
        } catch (err) {
            errorHandler(err);
        }
        
        function errorHandler(err) {
            console.log(err);
            res.locals.globalError = err;
            res.render('users/login');
        }
    }
}