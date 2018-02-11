class Helpers {

  authRequired(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  }

}

module.exports = Helpers;
