const Image = require('../../entities/Image');
const db = require('../../entities/Database');

module.exports = (req, res) => {
    const { file } = req;
    // console.log(file)
    const image = new Image(file);
    db.insert(image);
    return res.json(image.toJSON());
}