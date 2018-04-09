const router = require('express').Router();
const Helpers = require('../helpers');
const Video = require('../models/video');

const helpers = new Helpers();
const { authRequired } = helpers;

router.get('/', authRequired, (req, res) => {
  console.log('GETTING VIDEO GET ROUTE')
  Video.find({}, (err, videos) => {
    if (err) {
      res.status(500).send(err);
    }
    console.log('VIDEOS', videos)
    res.status(200).render('admin/video', { active: 'Videos', videos });
  });
});

router.post('/', authRequired, (req, res) => {
  Video.create(req.body, (err, video) => {
    if (err) {
      res.json(err);
    } else {
      res.json(video);
    }
  })
});

router.post('/:id', authRequired, (req, res) => {
  const { id } = req.params;
  Video.findByIdAndUpdate(id, req.body, { new: true }, (err, video) => {
    if (err) {
      res.json(err);
    } else {
      res.json(video);
    }
  })
})

router.post('/:id/delete', authRequired, (req, res) => {
  const { id } = req.params;
  Video.findByIdAndRemove(id, (err) => {
    if (err) {
      res.json(err);
    } else {
      res.redirect('/admin/video');
    }
  })
})

module.exports = router;