const express = require('express');
const app = express.Router();
const n8nController = require('../controller/n8n.controller');

app.post('/gemini', n8nController);

module.exports = app;