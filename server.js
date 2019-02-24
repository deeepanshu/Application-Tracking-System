let express = require('express'),
    app = express(),
    API_KEY = require('./config/keys'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    fs = require('fs');

require('./models/candidate.model');
require('./models/interview.model');
require('./models/interviewer.model');
require('./models/job.model');
require('./models/login.model');
require('./models/session.model');
require('./models/verification.model');


mongoose.connect(API_KEY.MONGO_URI, {
    useNewUrlParser: true
})
let routes = require('./routes/routes.route');

const PORT = 5000;

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log + "\n", err => {
        if (err) {
            console.log("Unable to append to server.log.");
        }
    });
    next();
});
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})