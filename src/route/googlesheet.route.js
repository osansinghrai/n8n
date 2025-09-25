const express = require('express');
const app = express.Router();
const googleSheetController = require('../controller/googlesheet/googlesheet.controller');

app.post("/sheet", googleSheetController);

module.exports = app;