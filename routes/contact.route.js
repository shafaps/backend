const express = require('express');
const route = express.Router();
const { sendContactEmail } = require('../controllers/contact.controller'); // Adjust path as necessary

// POST request to send a contact message
route.post('/send', sendContactEmail);

module.exports = route;
