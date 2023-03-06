import AWS  from 'aws-sdk';
import { BUCKET_NAME, ACCESS_KEY, SECRET_KEY } from '@env';

const region = 'eu-central-1';

export const uploadFileToS3 = async (file: string) => {

  const s3bucket = new AWS.S3({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    region: region,
    signatureVersion: 'v4',
  });

  const arrayBuffer = decodeURI(file);

  return new Promise((resolve, reject) => {
    s3bucket.createBucket(() => {
      const params = {
        Bucket: BUCKET_NAME,
        Key: 'image_' + Date.now() + '.jpeg',
        Body: arrayBuffer,
        ContentDisposition: 'image/jpeg',
        ContentType: 'image/jpeg',
      };
      s3bucket.upload(params, (error: Error, data:  AWS.S3.ManagedUpload.SendData) => {
        if (error) {
          reject({ error });
        } else {
          resolve(data);
        }
      });
    });
  });
};