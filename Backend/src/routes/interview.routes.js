const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const interviewController = require("../controllers/interview.controllers")
const upload = require("../middleware/file.middleware")


const interviewRouter = express.Router()


/** @route POST /api/interview */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterViewReportController)



/**@routes GET /api/interview.report/:interviewId */


module.exports = interviewRouter