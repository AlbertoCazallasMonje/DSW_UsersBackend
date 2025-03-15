const express = require('express');
const router = express.Router();

// Routes for each use case

// Users
const {UserRegister} = require('../../Application/Users/Register/UserRegister');

// Establish the route for each use case
// Users
router.post('/register', UserRegister);