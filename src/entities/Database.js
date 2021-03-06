const { EventEmitter } = require('events');
const { existsSync } = require('fs');
const { dbDumpFile } = require('../config');
const { writeFile, removeFile } = require('../util/fs');
const { prettifyJsonToString } = require('../util/prettifyJsonToString');
const Image = require('./Image');

class Database extends EventEmitter {
    constructor() {
        super();

        this.idToImg = {};
    }

    async initFromDump() {
        if (existsSync(dbDumpFile) === false) {
            return;
        }

        const dump = require(dbDumpFile);

        if (typeof dump.idToImg === 'object') {
            this.idToImg = {};

            for (let id in dump.idToImg) {
                const img = dump.idToImg[id];

                this.idToImg[id] = new Image(img.id, img.createdAt);
            }
        }
    }

    async insert(img) {
        // console.log(`path in insert = ${img.path}`)
        await writeFile(img.path, img.buffer);
        this.idToImg[img.id] = img.toJSON();
        this.emit('changed');
    }

    async remove(imgId) {
        if (this.idToImg[imgId]) {
            const path = this.idToImg[imgId].path;
            await removeFile(path)
            //console.log("before delete:")
            //console.log(this.idToImg)
            delete this.idToImg[imgId];
            //console.log("after delete:")
            //console.log(this.idToImg)
            this.emit('changed');
        } else {
            console.log("Not have such id")
        }
        return imgId;
    }

    findOne(imgId) {
        //console.log(`imgId in findOne=${imgId}`)
        //console.log(this.idToImg)
        if (this.idToImg[imgId]) {
            //console.log(`descr in findOne=${this.idToImg[imgId]}`)
            return this.idToImg[imgId];
        } else {
            //console.log("not find")
            return null;
        }
    }

    find() {
        console.log(this.idToImg)
        let allImgs = Object.values(this.idToImg);

        allImgs.sort((imgA, imgB) => imgB.createdAt - imgA.createdAt);

        return allImgs;
    }
    /*
    toJSON() {
        return {
            idToImg: this.idToImg
        };
    }
    */
}

const db = new Database();

db.initFromDump();


db.on('changed', () => {
    writeFile(dbDumpFile, prettifyJsonToString(db.idToImg));
});

module.exports = db;
