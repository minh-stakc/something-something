const express = require('express');

const sensorsRouter = express.Router();

sensorsRouter.get('/', (req, res) => {
    res.sendFile('/main.html', {root:'./Website'});
})
module.exports = sensorsRouter;



