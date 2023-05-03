const fs = require('fs');
const s3 = require('./s3');

module.exports.upload = async (file) => {
  
    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(file.path);
  
        if (fileStream instanceof fs.ReadStream)
            fileStream.on('error', err => {
                reject(err);
            });
  
        const fileName = `/documents/${file.path}-${file.originalname}`;
  
        return s3.upload(
            {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: fileName,
                Body: fileStream,
                ContentType: file.mimetype,
            },
            err => {
                if (err) {
                    reject(err);
                } else {
                    resolve(fileName);
                }
            }
        );
    });
};