var nodemailer = require("nodemailer");
const user = process.env.YAHOO_USER_ID;
const password = process.env.YAHOO_PASSWORD;
// console.log(user, password);
const passwordMailer = async (email, role, name, random_password) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.bizmail.yahoo.com",
    port: 587,
    service: "yahoo",
    secure: true,
    auth: {
      user,
      pass: password,
    },
    debug: false,
    logger: true,
  });

  var mailOptions = {
    from: user,
    to: email,
    subject: "Login credentials ",
    html: `Hey <strong>${name}</strong> we are very garteful for choosing us.
            <p>Your userid is your email and your password is: <strong>"${random_password}"</strong>,we recommend you to reset it afterwards </p>
            <p>And We are very delighted to let you know that you are registered with us as <strong>"${role}"</strong>.</p>
            <b> THANK YOU FOR YOUR CONSIDERASION </b>
            ` 
            
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
// const message = passwordmailer("rajnish17100042@gmail.com").catch(
//   console.error
// );
// console.log(message);

// export mailer function so that we can  use it in other file
module.exports = passwordMailer;