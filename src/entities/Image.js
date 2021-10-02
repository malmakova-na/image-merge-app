const path = require('path');
const { removeFile } = require('../util/fs');
const { generateId } = require('../util/generateId');

module.exports = class Image {
  constructor(id, size, createdAt) {
    this.id = id || generateId();
    this.createdAt = createdAt || Date.now();

    this.size = size;
    this.originalFilename = `${this.id}_original.jpeg`;
  }

  async removeOriginal() {
    return await removeFile(path.resolve(imgFolder, this.originalFilename));
  }

  toJSON() {
    return {
      id: this.id,
      size: this.size,
      createdAt: this.createdAt,
    };
  }
};