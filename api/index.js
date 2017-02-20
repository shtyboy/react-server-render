import fs from 'fs';
import path from 'path';

const Apis = fs.readdirSync('./')
  .filter(filename => !filename.includes('index.js'))
  .reduce((entries, dir) => {
    if (dir.lastIndexOf('.') >= 0) {
      let name = dir.slice(0, dir.lastIndexOf('.'));
      if (name) {
        entries[name] = require(path.join(__dirname, dir));
      }
    } else {
      entries[dir] = require(path.join(__dirname, dir));
    }
    return entries;
  }, {});
export default Apis;
