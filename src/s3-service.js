const cpsWormhole = require('@bbc/cps-wormhole');
const uuidv1 = require('uuid/v1');
const s3ClientFactory = require("./aws-factory");


const updateDocument = async (assetId, content) => {
    const s3Client = s3ClientFactory.getS3Client();
    const eventId = uuidv1();
    const objectParameters = {
        Body: JSON.stringify(content),
        Key: `${assetId}.json`,
        Bucket: 'cps-article-history-dev',
        Metadata: {
            eventId
        }
    }
    await cpsWormhole.setCredentials();
    
    return new Promise((resolve, reject) => {
        s3Client.putObject(objectParameters, function(err, data) {
            if (err) {
                reject(err)
            }

            resolve(data);
          });
    });
}

const getEventVersion = async (eventId, assetId) => {
    const objectParameters = {
        Prefix: `${assetId}.json`,
        Bucket: 'cps-article-history-dev'
    }

    console.log('paramter', JSON.stringify(objectParameters, null, 2));
    await cpsWormhole.setCredentials();
    
    return new Promise((resolve, reject) => {
        console.log('here we go');
        
        s3.listObjectVersions(objectParameters, function(err, data) {
            if (err) {
                console.log('FAIL!!!!', err);
                reject(err)
            }
            console.log('we are gonna resolve');
            
            resolve(data);
          });
    });
    
}

module.exports = {
    updateDocument,
    getEventVersion
}
