const { EventEmitter } = require('events');
const { existsSync } = require('fs');
const { dbDumpFile } = require('../config');
const { writeFile } = require('../util/fs');
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
    console.log(`path in insert = ${img.path}`)
    await writeFile(img.path, img.buffer);
    this.idToImg[img.id] = img.toJSON();
    this.emit('changed');
  }

  async remove(imgId) {
    const imgRaw = this.idToImg[imgId];

    const img = new Image(imgRaw.id, imgRaw.createdAt);

    await img.removeOriginal();

    delete this.idToIvg[imgId];

    this.emit('changed');

    return imgId;
  }

  findOne(imgId) {
    const imgRaw = this.idToimg[imgId];

    if (!imgRaw) {
      return null;
    }

    const img = new Image(imgRaw.id, imgRaw.createdAt);

    return img;
  }

  find() {
    let allImgs = Object.values(this.idToImg);

    allImgs.sort((imgA, imgB) => imgB.createdAt - imgA.createdAt);

    return allImgs;
  }

  toJSON() {
    return {
      idToImg: this.idToImg
    };
  }
}

const db = new Database();

db.initFromDump();


db.on('changed', () => {
  writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()));
});

module.exports = db;
