const express = require('express');
const router = express.Router();

// Routes for each use case

// Users
const {UserRegistrator} = require('../../application/users/register/UserRegistrator');
const {UserLogger} = require('../../application/users/logger/UserLogger');
const {UserUpdater} = require('../../application/users/updater/UserUpdater');
// Establish the route for each use case
// Users
router.post('/register', UserRegistrator);
router.post('/login', UserLogger);
router.put('/update', UserUpdater);


module.exports = router;
