const dataBaseHelper = require('../helpers/data-base-helper');

module.exports = (req,res,next) => {

    if(!req.session.user && req.cookies.user){
        const userFound = dataBaseHelper.getAllDataBase('users.json').find(user => user.id == req.cookies.user);
        req.session.user = userFound
    }
    return next();
}