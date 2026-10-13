const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes.js");
const profileRouter = require("./routes/profile.routes.js");
const requestRouter = require("./routes/request.routes.js")
const userRouter = require("./routes/user.routes.js")
const cors = require("cors");

const app = express();


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);



module.exports = { app }