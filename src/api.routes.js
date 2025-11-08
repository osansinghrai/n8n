const express = require('express');
const app = express.Router();

app.use('/n8n', require('./route/n8n.routes'));
app.use('/slack', require('./route/slack.route'));

module.exports = app;