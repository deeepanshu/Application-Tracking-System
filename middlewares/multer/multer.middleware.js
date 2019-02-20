let multer = require('multer');
let path = require('path');
let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if(file.fieldname === 'resumeFile')
            callback(null, `${__dirname}/../../assets/resumes/`);
        else if (file.fieldname === 'introVideo')
            callback(null, `${__dirname}/../../assets/intros/`);
        else
            callback(null, `${__dirname}/../../assets/`);
    },
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname) ? `${path.extname(file.originalname)}` : ``;
        callback(null, `${req.body.email}-${Date.now()}${ext}`);
    }
});
let upload = multer({
    storage: storage
});

module.exports = {
    type: upload.fields([{
        name: 'resumeFile',
        maxCount: 1
    }, {
        name: 'introVideo',
        maxCount: 1
    }])
}
