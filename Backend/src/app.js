const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://ai-powered-interview-preparation.netlify.app"
    ],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.routes");
const intervieRouter = require("./routes/interview.routes")

app.use("/api/auth", authRouter);
app.use("/api/interview", intervieRouter)

module.exports = app;