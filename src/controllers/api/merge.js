const fs = require('fs');
const path = require('path');
const { replaceBackground } = require('backrem');

module.exports = (req, res) => {
    const pathFrontImage = path.resolve(imageFolder, `${req.query.front}.jpg`);
    const pathBackImage = path.resolve(imageFolder, `${req.query.back}.jpg`);
  
    if (fs.existsSync(pathFrontImage) === false || fs.existsSync(pathBackImage) === false) {
      return res
    }
  
    return replaceBackground(
      fs.createReadStream(pathFrontImage),
      fs.createReadStream(pathBackImage),
      req.query.color?.split(',') ?? [0, 0, 0],
      req.query.threshold,
    )
      .then((readableStream) => {
        res.set({
          'Content-Disposition': `attachment; filename="merge.jpeg"`,
          'Content-Type': 'image/jpeg',
        });
  
        readableStream.pipe(res);
      })
};