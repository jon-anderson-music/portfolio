const express = require('express');
const Audio = require('../models/audio');
const Photo = require('../models/photo');

const router = express.Router();

const getAllAudio = new Promise((res, rej) => {
  Audio.find({}, (err, audios) => {
    if (err) {
      rej(err);
    } else {
      res(audios);
    }
  });
});

const getAllPhotos = new Promise((res, rej) => {
  Photo.find({}, (err, photos) => {
    if (err) {
      rej(err);
    } else {
      photos.sort((a, b) => {
        if (a.position < b.position) {
          return -1;
        }
        if (a.position > b.position) {
          return 1;
        }
        return 0;
      });
      res(photos);
    }
  });
});

router.get('/', (req, res) => {
  const data = {};
  Promise.all([
    getAllAudio,
    getAllPhotos,
  ]).then((values) => {
    [data.audios, data.photos] = values;
    res.render('main/index', data);
  });
});

router.post('/contact', (req, res) => {
  const { body } = req;
  console.log('THE REQUEST', body);
});

module.exports = router;
