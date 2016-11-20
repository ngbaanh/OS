var nodemailer = require('nodemailer');
exports.sendNodeMailer = function (mailOptions, next) {
    var config = {
      host: "smtp.gmail.com", // hostname
      secureConnection: true, // use SSL
      port: 465, // port for secure SMTP
      auth: {
        user: "noreplythanhle@gmail.com",
        pass: "!@#noreply!@#"
      }
    };
    
    var transporter = nodemailer.createTransport(config);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return next(error);
        }
        return next();
    });
};