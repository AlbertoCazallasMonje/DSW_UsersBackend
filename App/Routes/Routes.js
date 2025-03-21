const express = require('express');
const router = express.Router();

// Routes for each use case

// Users
const {UserRegister} = require('../../Application/Users/Register/UserRegister');
const {UserLogger} = require('../../Application/Users/Logger/UserLogger');
const {UserUpdater} = require('../../Application/Users/Updater/UserUpdater');
const {UserLoggerout} = require('../../Application/Users/Loggerout/UserLoggerout');
const {UserDeleter} = require('../../Application/Users/Deleter/UserDeleter');
const {UserLoader} = require('../../Application/Users/Finder/UserFinder');
// Establish the route for each use case
// Users
router.post('/register', UserRegister);
router.post('/login', UserLogger);
router.put('/update', UserUpdater);
router.post('/logout', UserLoggerout);
router.delete('/delete', UserDeleter);
router.get('/loadUser', UserLoader);