const express = require('express')
const authController = require("../controllers/auth.controllers")
const authMiddleware = require("../middleware/auth.middleware")


const authRouter = express.Router()

/** @routes POST /api/auth/register */

authRouter.post("/register", authController.registerUserControllers)

/** @routes POST /api/auth/login */

authRouter.post("/login", authController.loginUserControllers)

/** @routes GET /api/auth/logout */

authRouter.get("/logout", authController.logoutUserControllers)


/** @routes GET /api/auth/get-me */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeControllers)


module.exports = authRouter 