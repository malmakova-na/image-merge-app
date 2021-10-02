const db = require('../../entities/Database');
module.exports = async (req, res) => {
    const allImages = db.find();
  
    return res.json(allImages);
};