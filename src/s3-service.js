const cpsWormhole = require("@bbc/cps-wormhole");
const uuidv1 = require("uuid/v1");
const s3ClientFactory = require("./aws-factory");

const updateDocument = async (assetId, content) => {
  const s3Client = s3ClientFactory.getS3Client();
  const eventId = uuidv1();
  const objectParameters = {
    Body: JSON.stringify(content),
    Key: `${assetId}.json`,
    Bucket: "cps-article-history-dev",
    Metadata: {
      eventId
    }
  };
  await cpsWormhole.setCredentials();

  return new Promise((resolve, reject) => {
    s3Client.putObject(objectParameters, function(err, data) {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
};

const storeVersion = async (assetId, content) => {
  const s3Client = s3ClientFactory.getS3Client();
  const eventId = uuidv1();
  const objectParameters = {
    Body: JSON.stringify(content),
    Key: `${assetId}/${eventId}.json`,
    Bucket: "cps-article-history-dev"
  };

  await cpsWormhole.setCredentials();

  return new Promise((resolve, reject) => {
    s3Client.putObject(objectParameters, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve({ ...data, ...{ eventId } });
    });
  });
};

const getEventVersion = async (eventId, assetId) => {
  const s3Client = s3ClientFactory.getS3Client();

  const objectParameters = {
    Key: `${assetId}/${eventId}.json`,
    Bucket: "cps-article-history-dev"
  };

  await cpsWormhole.setCredentials();

  return new Promise((resolve, reject) => {
    s3Client.getObject(objectParameters, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const listObjectVersions = async (eventId, assetId) => {
  const s3Client = s3ClientFactory.getS3Client();

  const objectParameters = {
    Prefix: `${assetId}.json`,
    Bucket: "cps-article-history-dev"
  };

  await cpsWormhole.setCredentials();

  return new Promise((resolve, reject) => {
    s3Client.listObjectVersions(objectParameters, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = {
  updateDocument,
  getEventVersion,
  storeVersion,
  listObjectVersions
};
