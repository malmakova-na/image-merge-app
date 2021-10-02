const { imageFolder } = require('../../config/index')

module.exports = (req, res) => {
    const pathToFile = path.resolve(imageFolder, `${req.params.id}.jpeg`);
    return res.download(pathToFile);
};