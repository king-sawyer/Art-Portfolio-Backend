require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const jsonParser = express.json();
const productsRouter = require("./products/productsRouter");

const { NODE_ENV } = require("./config");
const artRouter = require("./art/artRouter");
const authRouter = require("./auth-folder/auth-router");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common;";
app.use(jsonParser);
app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.use("/art", artRouter);
app.use("/products", productsRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "product") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
