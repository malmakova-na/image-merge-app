const { imgFolder } = require('../../config')
const db = require('../../entities/Database');

module.exports = (req, res) => {
    const imgId = req.params.id;
    const img = db.findOne(imgId);
    if (img) {        
        res.type("jpg");
        res.sendFile(img.path);
    } else {
        res.status(404);
        res.end('Not found');
    }
};