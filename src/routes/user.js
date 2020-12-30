const express = require('express');
const router = express.Router();
const multerUser = require('../middlewares/multer/user')
const validator = require('../middlewares/validator');
const guest = require('../middlewares/guest');
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

// Muestra la vista de registro
router.get('/register',guest, userController.showRegister);

// Procesa la vista de registro
router.post('/register',guest, multerUser.single('avatar'),validator.register, userController.processRegister);

// Muestra la vista de login
router.get('/login',guest, userController.showLogin);

// Procesa la vista de login
router.post('/login',guest, validator.login, userController.processLogin);

// Muestra el perfil del usuario
router.get('/profile',auth, userController.showProfile);

// Cierra la sesión
router.get('/logout',auth, userController.logout);

module.exports = router;