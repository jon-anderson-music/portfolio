const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const options = {
  auth: {
    api_key: process.env.SENDGRID_API_KEY,
  },
};

const client = nodemailer.createTransport(sgTransport(options));

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
    const mailOptions = {
      from: email,
      to: process.env.OWNER_EMAIL,
      replyTo: email,
      subject: 'Jon Anderson Music Inquiry',
      text: `
        From:
        ${name}

        Email:
        ${email}

        Message:
        ${message}
      `,
      html: `
        <p>FROM: ${name}</p>
        <p>EMAIL: ${email}</p>
        <p>${message}</p>
      `,
    };

    client.sendMail(mailOptions, (error, info) => {
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
