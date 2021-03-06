const path = require('path');
const { imgFolder } = require("../config")
const { generateId } = require('../util/generateId');

module.exports = class Image {
    constructor(file) {
        this.id = generateId();
        this.createdAt = Date.now();

        this.size = file.size;
        this.buffer = file.buffer;
        this.filename = `${this.id}.jpg`;
        this.type = file.mimetype
        //console.log(`size = ${this.size}`)
        //console.log(`imgFolder = ${imgFolder}`)
        //console.log(`filename = ${this.filename}`)
        this.path = path.resolve(imgFolder, this.filename)
    }

    toJSON() {
        return {
            id: this.id,
            size: this.size,
            createdAt: this.createdAt,
            path: this.path,
            type: this.type
        };
    }
};