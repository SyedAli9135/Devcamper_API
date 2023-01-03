const express = require("express");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("../middleware/error");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const bootcamps = require("../routes/bootcamps");
const courses = require("../routes/courses");
const auth = require("../routes/auth");
const users = require("../routes/users");
const reviews = require("../routes/reviews");
const path = require("path");

const getRoutes = (app) => {
    app.use(express.json())
    app.use(fileupload())
    app.use(mongoSanitize())
    app.use(cookieParser())
    app.use(helmet())
    app.use(xss())
    const limiter = rateLimit({
        windowMs: 10 * 60 * 1000,
        max: 100,
    })
    app.use(limiter)
    app.use(hpp())
    app.use(cors())
    app.use(express.static(path.join(__dirname, "public")))
    if (process.env.NODE_ENV === "development") app.use(morgan("dev"))
    app.use("/api/v1/bootcamps", bootcamps);
    app.use("/api/v1/courses", courses);
    app.use("/api/v1/auth", auth);
    app.use("/api/v1/users", users);
    app.use("/api/v1/reviews", reviews);
    app.use(errorHandler);
}

module.exports = getRoutes;