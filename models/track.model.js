const { text } = require('stream/consumers');
const { Datatypes, sequelize } = require('./../lib/index');

let track = sequelize.define('track', {
  name: Datatypes.TEXT,
  genre: Datatypes.TEXT,
  release_year: Datatypes.INTEGER,
  artist: Datatypes.TEXT,
  album: Datatypes.TEXT,
  duration: Datatypes.INTEGER,
});

module.exports = {
  track,
};
