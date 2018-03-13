const express = require('express');
const Helpers = require('../helpers');
const Photo = require('../models/photo');
const cloudinary = require('cloudinary');

const router = express.Router();

const helpers = new Helpers();
const { authRequired } = helpers;

const updatePhotoById = (image, id, res) => {
  const options = { public_id: id };
  cloudinary.uploader.upload(image, (result) => {
    console.log('RESULT', result);
    const updateObj = { url: result.url };
    Photo.findByIdAndUpdate(id, updateObj, { new: true }, (error, photo) => {
      if (error) {
        throw error;
      } else {
        res.redirect('/admin/photo');
      }
    });
  }, options);
};

router.get('/', authRequired, (req, res) => {
  Photo.find({}, (err, photos) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).render('admin/photo', { active: 'Photos', photos });
  });
});

router.post('/', authRequired, (req, res) => {
  console.log('BODY', req.body);
  const image = {
    title: req.body.title,
    description: req.body.description,
    position: req.body.position,
  };
  Photo.create(image, (err, photo) => {
    if (err) {
      console.error('ERROR SAVING PHOTO', err);
    } else {
      console.log('THE PHOTO SAVED', photo);
      const { _id: id } = photo;
      updatePhotoById(req.body.image, id, res);
    }
  });
});

router.post('/:id/edit/image', authRequired, (req, res) => {
  updatePhotoById(req.body.image, req.params.id, res);
});

router.post('/:id/edit/:property', authRequired, (req, res) => {
  console.log('HITTING THE PUT ROUTE');
  console.log('param', req.params);
  console.log('BODY', req.body);
  const { id, property } = req.params;
  const updateObj = {};
  updateObj[property] = req.body.property;
  Photo.findByIdAndUpdate(id, updateObj, { new: true }, (err, photo) => {
    if (err) {
      throw err;
    } else {
      res.redirect('/admin/photo');
    }
  });
});

router.post('/:id/delete', authRequired, (req, res) => {
  const { id } = req.params;
  Photo.findByIdAndRemove(id, (err) => {
    if (err) {
      console.error('ERROR DELETING PHOTO', err);
    } else {
      cloudinary.uploader.destroy(id, (result) => {
        res.redirect('/admin/photo');
      });
    }
  });
});

module.exports = router;
