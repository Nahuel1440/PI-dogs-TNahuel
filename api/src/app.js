const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");

require("./db.js");

//MIDDLEWARES

//Se crea la app de express
const server = express();
//Se le pone un nombre
server.name = "API";
//Se parsea el body a json (Investigar bien como lo hace)
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
//parsea el cookie header a un objeto en req.cookies
server.use(cookieParser());
//Agrega a las req información adicional. En este caso mostrará info sobre la peticion en consola
server.use(morgan("dev"));
//Otorgar permisos a cierto dominio
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Si hay una peticion a la ruta "/" se lo lleva a su ruta
server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
