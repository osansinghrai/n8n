const express = require('express');
const app = express.Router();

app.use('/n8n', require('./route/n8n.routes'));
app.use('/googlesheet', require('./route/googlesheet.route'));

module.exports = app;