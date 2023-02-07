const express = require('express');

const petsRouter = express.Router();

petsRouter.get('/', (req, res) => {
    res.sendFile('/main.html', {root:'./Website'});
})













module.exports = petsRouter;



