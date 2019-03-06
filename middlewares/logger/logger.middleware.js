const fs = require('fs');
module.exports = {
    logger: (req, res, next) => {
        let now = new Date().toString();
        let log = `${now}: ${req.method} ${req.url}`;
        console.log(log);
        fs.appendFile("server.log", log + "\n", err => {
            if (err) {
                console.log("Unable to append to server.log.");
            }
        });
        next();
    }
}