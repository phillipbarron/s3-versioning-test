const cpsWormhole = require('@bbc/cps-wormhole');
const uuidv1 = require('uuid/v1');
const s3ClientFactory = require("./aws-factory");


const updateDocument = async (assetId, content) => {
    const s3Client = s3ClientFactory.getS3Client();
    const eventId = uuidv1();
    const objectParameters = {
        Body: content,
        Key: `${assetId}.json`,
        Bucket: 'cps-article-history-dev',
        Metadata: {
            eventId
        }
    }
    await cpsWormhole.setCredentials();

    s3Client.put(objectParameters, (error, response) => {
        if(error) {
            throw Error(error);
        }
        return response;
    });
}

module.exports = {
    updateDocument
}
