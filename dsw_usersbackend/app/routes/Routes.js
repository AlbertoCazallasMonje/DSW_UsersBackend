const express = require('express');
const router = express.Router();

// Routes for each use case

// Users
const { UserRegistrator } = require('../../application/users/register/UserRegistrator');

// Establish the route for each use case
// Users
router.post('/register', UserRegistrator);


module.exports = router;
