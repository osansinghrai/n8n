const express = require('express');
const apiRoutes = require('./route/api.routes');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Connected successfully!');
});

router.use('/api', apiRoutes);

module.exports = router;