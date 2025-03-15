const config = require('../App/Config/Config');
const express = require('express');
const swaggerDocs = require("../App/Docs/SwaggerDocs");
const swaggerUi = require("swagger-ui-express");
const app = express();
const router = express.Router();
const UserController = require('./Users/UserController');
const userController = new UserController();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(router);

// Swagger endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes for each use case
// Users
router.post('/register', userController.Register.bind(userController));


// Initialize Server
const port = config.server.port;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});