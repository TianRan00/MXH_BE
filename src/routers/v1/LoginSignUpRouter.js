const express = require('express');
const {signUp, Login, Logout} = require('../../controllers/LoginSignUp')
const LoginSignUpRouter =express.Router();

LoginSignUpRouter.post("/signup", signUp)
LoginSignUpRouter.post("/login", Login)
LoginSignUpRouter.post("/logout",Logout)

module.exports = LoginSignUpRouter;