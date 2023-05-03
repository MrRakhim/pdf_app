const aws = require('aws-sdk');

aws.config.update({
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
});

module.exports.s3 = new aws.S3({
    apiVersion: '2006-03-01',
});
