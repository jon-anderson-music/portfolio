const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  port: 587,
});

const mailOptions = {
  to: 'austinwc33@yahoo.com',
  subject: 'Jon Anderson Music Inquiry',
};

class Helpers {
  activateOne(arr, index, key, val) {
    arr.forEach((item, i) => {
      if (index === i) {
        item[key] = val;
      } else {
        item[key] = !val;
      }
    });
  }

  authRequired(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  }

  sendMail(name, email, message, res) {
    console.log('TRANSPORTER', transporter);
    mailOptions.from = email;
    mailOptions.text = `
      From:
      ${name}

      Email:
      ${email}

      Message:
      ${message}
    `;
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.redirect('/message_error');
      } else {
        console.log(`Email sent: ${info.response}`);
        res.redirect('/message_sent');
      }
    });
  }
}

module.exports = Helpers;
