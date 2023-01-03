const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const getRoutes = require("./start/getRoutes");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
getRoutes(app)

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);

// Handle Unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close Server and Exit
  server.close(() => process.exit(1));
});
