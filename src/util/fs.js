const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);
const unlinkFileAsync = util.promisify(fs.unlink);
const existsFileAsync = util.promisify(fs.exists);

module.exports = {
  writeFile: async (path, content) => {
    //console.log(`path in write file = ${path}`)
    await writeFileAsync(path, content, { encoding: 'utf-8' });
  },
  removeFile: async (path) => {
    try {
      await unlinkFileAsync(path);
    } catch (err) {
      console.log(`removeFile error: no file with ${path} `);
    }
  },

  exists: async (path) => await existsFileAsync(path),
};