import AWS from 'aws-sdk';
import config from '../config'

const s3 = new AWS.S3({
    accessKeyId: config.ACCESS_KEY_ID,
    secretAccessKey: config.SECRET_ACCESS_KEY,
});

class UploadServices {

    static async uploadImage(file) {
        try {
            const params = {
                Bucket: config.BUCKET_NAME,
                Key: file.originalname,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read'
            };

            const data = s3.upload(params).promise();
            const image = data
                .then((result) => result)
                .catch((err) => err);
            return image
        } catch (error) {
            return error
        }
    }
}

export default UploadServices;