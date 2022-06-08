const { Router } = require("express");
// Importar todos los routers;
const dogsRouter = require("./dogs.js");
const temperRouter = require("./temperaments.js");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
router.use("/dogs", dogsRouter);
router.use("/temperaments", temperRouter);
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
