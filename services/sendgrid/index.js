const sgMail = require('@sendgrid/mail');
const keys = require('../../config/keys');
sgMail.setApiKey(keys.SENDGRID);
module.exports = (sendConfiguration) => {
    const msg = {
        to: sendConfiguration.to,
        from: 'support@ats.com',
        subject: sendConfiguration.subject,
        html: sendConfiguration.html,
    };
    sgMail.send(msg);     
}
