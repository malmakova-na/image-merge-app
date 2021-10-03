const fs = require('fs');
const path = require('path');
const { replaceBackground } = require('backrem');
const {imgFolder} =require('../../config');
const db = require('../../entities/Database')

module.exports = (req, res) => {

    if(!(req.query.front) || !(req.query.back)) {
        res.status(400);
        res.end('Bad request');
    }    
    
    let imgFrontPath = db.findOne(req.query.front).path;
    let imgBackPath = db.findOne(req.query.back).path;

    
    const front = fs.createReadStream(imgFrontPath);
    const back = fs.createReadStream(imgBackPath);
    let color, threshold;
    if(req.query.color) color = req.query.color.split(',');
    if(req.query.threshold) threshold = new Number(req.query.threshold);
    

    replaceBackground(front, back, color, threshold)
    .then((readableStream) => {
      let resultPath = path.resolve(imgFolder, `./result.jpg`)
      const writableStream = fs.createWriteStream(resultPath);
      readableStream.pipe(writableStream);
      readableStream.on('end',()=>{
          res.type('image/jpg')
          res.sendFile(link);
      })

    })
  
};