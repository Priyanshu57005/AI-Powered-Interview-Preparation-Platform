const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const interviewController = require("../controllers/interview.controllers")
const upload = require("../middleware/file.middleware")


const interviewRouter = express.Router()


/** @route POST /api/interview */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterViewReportController)



/**@routes GET /api/interview.report/:interviewId */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)



/**@route GET /api/interview/*/
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)



/**@route post /api/interview/resume/pdf */
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)



module.exports = interviewRouter