const config = require('../App/Config/Config');
const express = require('express');
const swaggerDocs = require("../App/Docs/SwaggerDocs");
const swaggerUi = require("swagger-ui-express");
const app = express();
const router = express.Router();
const UserController = require('./Users/UserController');
const userController = new UserController();
const ActionController = require('./Actions/ActionController');
const actionController = new ActionController();
const SessionController = require('./Session/SessionController');
const sessionController = new SessionController();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(router);

// Swagger endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes for each use case
// Users
router.post('/register', userController.Register.bind(userController));
router.post('/login', userController.Login.bind(userController));
router.put('/update', userController.Update.bind(userController));
router.post('/logout', userController.Logout.bind(userController));
router.delete('/delete', userController.DeleteAccount.bind(userController));
router.get('/findUser', userController.FindUser.bind(userController));

// Actions
router.post('/action', actionController.RequestActionToken.bind(actionController));

// Session
router.post('/session/validate', sessionController.ValidateToken.bind(sessionController));

// Initialize Server
const port = config.server.port;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});