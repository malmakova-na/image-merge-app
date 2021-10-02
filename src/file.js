const multer = require('multer');
const { imgFolder } = require('./config');

const { generateId } = require('./util/generateId');


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, imgFolder);
    },
    filename(req, file, cb) {
        const id = generateId();

        cb(null, `${id}` + '-' + file.originalname);
    }
});

const types = ['image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false)
    }
};

module.exports = multer(storage, fileFilter);