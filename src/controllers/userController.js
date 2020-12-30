const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const dataBaseHelper = require('../helpers/data-base-helper');


module.exports = {
    showRegister: (req, res) => {
        // Do the magic
        return res.render('user/user-register-form');
    },
    processRegister: (req, res) => {
        // Do the magic
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.render ('user/user-register-form', {
                errors: errors.mapped(),
                email: req.body.email
            })
        }
        const newUser = {
            id: dataBaseHelper.generateId('users.json'),
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }
        const allUsers = dataBaseHelper.getAllDataBase('users.json');
        const usersToSave = [...allUsers, newUser]
        dataBaseHelper.writeNewDataBase(usersToSave, 'users.json');
        res.redirect('/user/login')
    },
    showLogin: (req, res) => {
        // Do the magic
        return res.render('user/user-login-form');
    },
    processLogin: (req, res) => {
        // Do the magic
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.render ('user/user-login-form', {
                errors: errors.mapped(),
                email: req.body.email
            })
        }
        const userFound = dataBaseHelper.getAllDataBase('users.json').find(user => user.email == req.body.email);

        req.session.user = userFound;

        if(req.body.remember){
            res.cookie('user', userFound.id,{maxAge: 1000 * 60 * 60 * 24 * 365});
        }

        return res.redirect('/')
    },
    showProfile: (req, res) => {
        return res.render('user/profile');
    },
    logout: (req, res) => {
        // Do the magic
        req.session.destroy(()=> {
            req.session = null;
            res.cookie('user', null, {maxAge: 0});
            return res.redirect('/');
        })
    }

}