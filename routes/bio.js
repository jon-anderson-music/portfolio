const express = require('express');
const router = express.Router();
const Bio = require('../models/bio');

const Helpers = require('../helpers');
const helpers = new Helpers();
const { authRequired } = helpers;

router.get('/', authRequired, (req, res) => {
  Bio.find({}, (err, paragraphs) => {
    if (err) {
      throw err;
    } else {
      const data = {
        active: 'Bio',
        paragraphs
      };
      res.render('admin/bio', data);
    }
  })
});

router.post('/', authRequired, (req, res) => {
  const { body } = req;
  body.paragraph = body.paragraph.trim();
  Bio.create(body, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })
})

router.post('/:id/edit', authRequired, (req, res) => {
  const { id } = req.params;
  const updateObj = req.body;
  updateObj.paragraph = updateObj.paragraph.trim();
  Bio.findByIdAndUpdate(id, updateObj, { new: true }, (err, para) => {
    if (err) {
      res.json(err)
    } else {
      res.json(para);
    }
  })
})

router.post('/:id/delete', authRequired, (req, res) => {
  const { id } = req.params;
  Bio.findByIdAndRemove(id, (err) => {
    if (err) {
      res.json(err);
    } else {
      res.redirect('/admin/bio');
    };
  })
})

module.exports = router;