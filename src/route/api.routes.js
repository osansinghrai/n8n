const express = require('express');
const app = express.Router();
const n8nRoutes = require('./n8n.routes');

app.use('/n8n', n8nRoutes);

module.exports = app;