const express = require('express');
const router = express.Router();

// Routes for each use case

// Users
const {UserRegister} = require('../../Application/Users/Register/UserRegister');
const {UserLogger} = require('../../Application/Users/Logger/UserLogger');

// Establish the route for each use case
// Users
router.post('/register', UserRegister);
router.post('/login', UserLogger);