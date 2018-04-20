const express = require('express');
const Audio = require('../models/audio');
const Bio = require('../models/bio');
const Photo = require('../models/photo');
const Video = require('../models/video');

const router = express.Router();
const Helpers = require('../helpers/');

const helpers = new Helpers();

const { sendMail } = helpers;

router.get('/', (req, res) => {
  const data = {};
  const getAllAudio = new Promise((res, rej) => {
    Audio.find({}, (err, audios) => {
      if (err) {
        rej(err);
      } else {
        audios.sort((a, b) => (a.order < b.order ? -1 : 1));
        res(audios);
      }
    });
  });

  const getAllPhotos = new Promise((res, rej) => {
    Photo.find({}, (err, photos) => {
      if (err) {
        rej(err);
      } else {
        photos.sort((a, b) => (a.position < b.position ? -1 : 1));
        res(photos);
      }
    });
  });

  const getAllParas = new Promise((res, rej) => {
    Bio.find({}, (err, paras) => {
      if (err) {
        rej(err);
      } else {
        paras.sort((a, b) => (a.order < b.order ? -1 : 1));
        res(paras);
      }
    });
  });

  const getAllVids = new Promise((res, rej) => {
    Video.find({}, (err, videos) => {
      if (err) {
        rej(err);
      } else {
        videos.sort((a, b) => (a.order < b.order ? -1 : 1));
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
  const {
    email,
    message,
    name,
  } = body;
  sendMail(name, email, message, res);
});

router.get('/message_sent', (req, res) => {
  res.render('main/message_sent');
});

router.get('/message_error', (req, res) => {
  res.render('main/message_error');
});

module.exports = router;
