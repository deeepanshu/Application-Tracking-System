let express = require('express'),
    app = express(),
    API_KEY = require('./config/keys'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    logger = require('./middlewares/logger/logger.middleware').logger,
    crossorigins = require('./middlewares/crossorigins/crossorigins.middleware').crossorigins,
    path = require('path');

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

app.use(express.static(path.join(__dirname, '/assets')));
app.use("/", express.static(path.join(__dirname, "angular")));
app.use(logger);

app.use(crossorigins);

app.use(passport.initialize());

require('./strategy/passport')(passport);

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

app.use(routes);
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'angular', 'index.html'))
} )

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})