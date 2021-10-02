const db = require('../../entities/Database');
module.exports = async (req, res) => {
    const allImages = db.find().map((img) => img.toJSON());
  
    return res.json(allImages);
};