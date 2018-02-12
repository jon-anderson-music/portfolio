class Helpers {

  activateOne(arr, index, key, val) {
    arr.forEach((item, i) => {
      if (index === i) {
        item[key] = val;
      } else {
        item[key] = !val;
      }
    })
  }

  authRequired(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  }

}

module.exports = Helpers;
