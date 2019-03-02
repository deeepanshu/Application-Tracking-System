const keys = require('./../../../config/keys');
const host = keys.HOST;
module.exports = {
    registration: (to, password, subject) => {
        return  {
            to: to,
            subject: subject,
            html: `<div><h3>Login Details</h3><h5>Login ID: ${to}</h5><h5>Password: ${password}</h5></div>`
        };
    },
    candidateSignUp: (to, token, subject) => {
        return {
            to: to,
            subject: subject,
            html: `<div><h3>Welcome to Applicant Tracking System</h3><p><a href="${host}/signup/verify/${token}">Click this link</a> to continue registration.</p></div>`
        }
    }
    
} 