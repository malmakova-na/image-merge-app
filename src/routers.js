const express = require('express')
// const file = require('./file')

const api = require('./controllers/api')

const apiRouter = new express.Router();

apiRouter.post('/upload', api.upload);
apiRouter.get('/list', api.getAll);
apiRouter.get('/image/:id', api.getImg)
apiRouter.delete('/image/:id', api.deleteImg);
apiRouter.get('/merge', api.merge );

  
exports.apiRouter = apiRouter;


const mainRouter = new express.Router();
mainRouter.get('/ping',(req, res) => res.json({ ping: 'pong' }));
exports.mainRouter = mainRouter;