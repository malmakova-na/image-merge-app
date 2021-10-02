const { imgFolder } = require('../../config')
const db = require('../../entities/Database');

module.exports = (req, res) => {
    const imgId = req.params.id;
    console.log(`imgId in getImg=${imgId}`)
    const img = db.findOne(imgId);
    console.log(`descr in getImg=${img}`)
    console.log(`img type=${img.type}`)
    if (img) {        
        res.type("jpg");
        res.sendFile(img.path);
    } else {
        res.status(404);
        res.end('Not found');
    }
};