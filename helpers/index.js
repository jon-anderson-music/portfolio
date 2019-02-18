const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    const msg = {
      to: process.env.OWNER_EMAIL,
      from: email,
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

    sgMail.send(msg).then((info) => {
      console.log('Email sent!');
      console.log(info);
      res.redirect('/message_sent');
    }).catch((error) => {
      console.error(error);
      res.redirect('/message_error');
    });
  }
}

module.exports = Helpers;
