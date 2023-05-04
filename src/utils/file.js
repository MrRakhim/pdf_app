const fs = require('fs');
const { s3 } = require('./s3');

module.exports.upload = async (file) => {

    return new Promise((resolve, reject) => {
        const fileStream = file.data instanceof Buffer ? file.data : fs.createReadStream(file.data);

        if (fileStream instanceof fs.ReadStream)
            fileStream.on('error', err => {
                reject(err);
            });
  
        const fileName = `/documents/${new Date().getTime()}-${file.name}`;
  
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

module.exports.download = (fileName) => {
    return s3
        .getObject({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
        })
        .createReadStream();
};

module.exports.generateUrlToS3 = (fileName) => {
    return `https://s3.${process.env.AWS_S3_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}/${fileName}`;
};
  
module.exports.deleteFile = (fileName) => {
    return new Promise((resolve, reject) => {
        return s3.deleteObject(
            {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: fileName,
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
