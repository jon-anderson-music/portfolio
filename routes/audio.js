const express = require('express');
const Helpers = require('../helpers');
const Audio = require('../models/audio');
const cloudinary = require('cloudinary');

const router = express.Router();

const helpers = new Helpers();
const { authRequired } = helpers;

const updateAudioFileById = (audio, id, res) => {
  const options = { public_id: id, resource_type: 'video' };
  cloudinary.uploader.upload(audio, (result) => {
    const updateObj = { url: result.secure_url };
    Audio.findByIdAndUpdate(id, updateObj, { new: true }, (err, audio) => {
      if (err) {
        console.error('ERROR UPLOADING TO CLOUDINARY', err);
        throw err;
      } else {
        console.log('THE FILE UPLOADED TO CLOUDINARY');
        res.json(audio);
      }
    });
  }, options);
};

router.get('/', authRequired, (req, res) => {
  Audio.find({}, (err, audioFiles) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).render('admin/audio', { active: 'Audios', audioFiles });
  });
});

router.post('/', authRequired, (req, res) => {
  const audioFile = {
    title: req.body.title,
    order: req.body.order,
  };
  Audio.create(audioFile, (error, audio) => {
    if (error) {
      console.error('ERROR SAVING PHOTO', error);
      res.json(error);
    } else {
      console.log('THE PHOTO SAVED', audio);
      const { _id: id } = audio;
      updateAudioFileById(req.body.audio, id, res);
    }
  });
});

router.post('/:id/edit/audio', authRequired, (req, res) => {
  updateAudioFileById(req.body.audio, req.params.id, res);
});

router.post('/:id/edit/:property', authRequired, (req, res) => {
  console.log('HITTING THE UPDATE ROUTE', req.body, req.params);
  const { id, property } = req.params;
  const updateObj = {};
  updateObj[property] = req.body.property;
  Audio.findByIdAndUpdate(id, updateObj, { new: true }, (err, audio) => {
    if (err) {
      throw err;
    } else {
      res.json(audio);
    }
  });
});

router.post('/:id/delete', authRequired, (req, res) => {
  const { id } = req.params;
  Audio.findByIdAndRemove(id, (err) => {
    if (err) {
      console.error('ERROR DELETING PHOTO', err);
    } else {
      cloudinary.api.delete_resources([id], (result) => {
        res.redirect('/admin/audio');
      }, { resource_type: 'video' });
    }
  });
});

module.exports = router;
