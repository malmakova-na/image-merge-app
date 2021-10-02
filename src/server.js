const express = require('express');
const http = require('http');
const path = require('path');
const api = require('./controllers/api')
const { apiRouter, mainRouter } = require('./routers');
const { PORT } = require('./config/index.js');
const multer = require('multer');
const upload = multer();

const app = express();

app.use(upload.single('image'));
app.use('/', apiRouter);
app.get('/ping', (req, res) => res.json({ ping: 'pong' }));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
