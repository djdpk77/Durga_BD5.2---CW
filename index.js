const express = require('express');
const { resolve } = require('path');

const app = express();
let { sequelize } = require('./lib/index');
let { track } = require('./models/track.model');

let movieData = [
  {
    name: 'Raabta',
    genre: 'Romantic',
    release_year: 2012,
    artist: 'Arijit Singh',
    album: 'Agent Vinod',
    duration: 4,
  },
  {
    name: 'Naina Da Kya Kasoor',
    genre: 'Pop',
    release_year: 2018,
    artist: 'Amit Trivedi',
    album: 'Andhadhun',
    duration: 3,
  },
  {
    name: 'Ghoomar',
    genre: 'Traditional',
    release_year: 2018,
    artist: 'Shreya Ghoshal',
    album: 'Padmaavat',
    duration: 3,
  },
  {
    name: 'Bekhayali',
    genre: 'Rock',
    release_year: 2019,
    artist: 'Sachet Tandon',
    album: 'Kabir Singh',
    duration: 6,
  },
  {
    name: 'Hawa Banke',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Darshan Raval',
    album: 'Hawa Banke (Single)',
    duration: 3,
  },
  {
    name: 'Ghungroo',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'War',
    duration: 5,
  },
  {
    name: 'Makhna',
    genre: 'Hip-Hop',
    release_year: 2019,
    artist: 'Tanishk Bagchi',
    album: 'Drive',
    duration: 3,
  },
  {
    name: 'Tera Ban Jaunga',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Tulsi Kumar',
    album: 'Kabir Singh',
    duration: 3,
  },
  {
    name: 'First Class',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 4,
  },
  {
    name: 'Kalank Title Track',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 5,
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await track.bulkCreate(movieData);

    res.status(200).json({ message: 'Database seeding successfull' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

async function fetchAllTracks() {
  let tracks = await track.findAll();
  return { tracks };
}

app.get('/tracks', async (req, res) => {
  try {
    let response = await fetchAllTracks();

    if (response.tracks.length === 0) {
      return res.status(404).json({ message: 'No tracks found.' });
    }

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function fetchTrackById(id) {
  let tracks = await track.findOne({ where: { id } });
  return { track: tracks };
}

app.get('/tracks/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let response = await fetchTrackById(id);

    if (response.track.length === 0) {
      return res.status(404).json({ message: 'Track not found' });
    }

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function fetchTrackByArtist(artist) {
  let tracks = await track.findAll({ where: { artist } });
  return { tracks: tracks };
}

app.get('/tracks/artist/:artist', async (req, res) => {
  let artist = req.params.artist;
  try {
    let response = await fetchTrackByArtist(artist);

    if (response.tracks.length === 0) {
      return res.status(404).json({ message: 'Track not found' });
    }

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function sortTrackByReleaseYear(order) {
  let sortedTracks = await track.findAll({ order: [['release_year', order]] });

  return { tracks: sortedTracks };
}

app.get('/tracks/sort/release_year', async (req, res) => {
  try {
    let order = req.query.order;
    let result = await sortTrackByReleaseYear(order);

    if (result.tracks.length === 0) {
      return res.status(404).json({ message: 'Track not found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
