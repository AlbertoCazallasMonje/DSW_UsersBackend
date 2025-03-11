const config = require('../app/config/Config');
const express = require('express');
const swaggerDocs = require("../app/docs/SwaggerDocs");
const swaggerUi = require("swagger-ui-express");
const app = express();
const router = express.Router();
const userController = require('./UserController');
require('dotenv').config();
app.use(express.json());
app.use(router);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes for each use case
router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.put('/update', (req, res) => userController.update(req, res));


// Initialize Server
const port = config.server.port;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
