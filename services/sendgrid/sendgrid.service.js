const sgMail = require('@sendgrid/mail');
const keys = require('./../../config/keys');
sgMail.setApiKey(keys.SENDGRID);
module.exports = (to, subject, password) => {
    const msg = {
        to: to,
        from: 'support@ats.com',
        subject: subject,
        html: `<div><h3>Login Details</h3><h5>Login ID: ${to}</h5><h5>Password: ${password}</h5></div>`,
    };
    sgMail.send(msg);     
}
