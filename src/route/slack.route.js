const express = require('express');
const app = express.Router();
const slackController = require('../controller/slack.controller');

app.post("/notification", slackController);

module.exports = app;