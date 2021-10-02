const { Image } = require('../../entities/Image');
const db = require('../../entities/Database');

module.exports = async(req, res) => {
    const image = new Image(req.id, req.file.size, Date.now());
  
    db.insert(image);
  
    return res.json({ id: req.id });
}