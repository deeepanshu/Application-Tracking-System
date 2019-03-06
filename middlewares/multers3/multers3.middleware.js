let multer = require('multer');
let multerS3 = require('multer-s3');
let aws = require('aws-sdk');
let keys = require('./../../config/keys');

aws.config.update({
    secretAccessKey: keys.AWS_SECRET_KEY,
    accessKeyId: keys.AWS_ACCESS_KEY_ID,
    region: keys.AWS_REGION
})

let s3 = new aws.S3();
let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: keys.AWS_BUCKET_NAME,
        acl: keys.AWS_ACL,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: (req, file, cb) => {
            console.log(file);
            cb(null, file.originalname);
        }
    })
});

module.exports = {
    signUpUpload: upload.fields([{
        name: 'resumeFile',
        maxCount: 1
    }, {
        name: 'introVideo',
        maxCount: 1
    }])
}