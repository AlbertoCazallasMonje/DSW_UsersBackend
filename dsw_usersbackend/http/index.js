const config = require('../app/config/Config');
const express = require('express');
const app = express();
const router = express.Router();
const userController = require('./UserController');

app.use(express.json());
app.use(router);

// Routes for each use case
router.post('/register', (req, res) => userController.register(req, res));

// Initialize Server
const port = config.server.port;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
