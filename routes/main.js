const express = require('express');
const Audio = require('../models/audio');
const Bio = require('../models/bio');
const Photo = require('../models/photo');
const Video = require('../models/video');

const router = express.Router();

router.get('/', (req, res) => {
  const data = {};
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

  const getAllParas = new Promise((res, rej) => {
    Bio.find({}, (err, paras) => {
      if (err) {
        rej(err);
      } else {
        paras.sort((a, b) => {
          if (a.order < b.order) {
            return -1;
          }
          if (a.order > b.order) {
            return 1;
          }
          return 0;
        });
        res(paras);
      }
    });
  });

  const getAllVids = new Promise((res, rej) => {
    Video.find({}, (err, videos) => {
      if (err) {
        rej(err);
      } else {
        videos.sort((a, b) => a.order < b.order ? -1 : 1);
        res(videos);
      }
    });
  });

  Promise.all([
    getAllAudio,
    getAllPhotos,
    getAllParas,
    getAllVids,
  ]).then((values) => {
    [data.audios, data.photos, data.paragraphs, data.videos] = values;
    res.render('main/index', data);
  });
});

router.post('/contact', (req, res) => {
  const { body } = req;
  console.log('THE REQUEST', body);
});

module.exports = router;
