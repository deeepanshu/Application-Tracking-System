module.exports = {
    registration: (to, password, subject) => {
        return  {
            to: to,
            subject: subject,
            html: `<div><h3>Login Details</h3><h5>Login ID: ${to}</h5><h5>Password: ${password}</h5></div>`
        };
    }
    
} 