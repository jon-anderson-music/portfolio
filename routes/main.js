const express = require('express');
const Photo = require('../models/photo');

const router = express.Router();

router.get('/', (req, res) => {
  const data = {};
  Photo.find({}, (err, photos) => {
    if (err) {
      console.error('ERROR GETTING PHOTOS', err);
    } else {
      data.photos = photos.sort((a, b) => {
        if (a.position < b.position) {
          return -1;
        }
        if (a.position > b.position) {
          return 1;
        }
        return 0;
      });
      console.log('DATA PHOTOS', data.photos);
      res.render('main/index', data);
    }
  });
});

module.exports = router;
