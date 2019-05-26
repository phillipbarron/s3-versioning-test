# prototype for verisoning a json doc in S3

## Install

```bash
npm i
```

## Run

```bash
npm run dev
```

### Provides 2 endpoints

* `POST: localhost:3000/{assetId}`
* `GET: localhost:3000/{assetId}/{eventId}`

`eventIds` are returned from the POST endpoint

### Where is all my stuff?

[here](https://s3.console.aws.amazon.com/s3/buckets/cps-article-history-dev/?region=eu-west-1&tab=overview)

## Requires

* node
* `CERT_LOCATION` environment variable exported. This should point to either unencrypted PEM or p12 Developer certificate. In the case of the latter, you will also need to have your `CERT_PASSPHRASE` exported.

## todo

* install basic express app **done**
* set up a bucket **done**
* get wormhole access (maybe cps wormhole) **done**
* add route to add / update asset with `POST:/{assetId}` signature **done**
* add route to get all versions
  * can we filter versions on meta-data? it would be better for this to be done via s3.
    * does not appear to be possible - listing all versions does not return the user supplied metadata so there is no way to find the correct s3 version  without getting each object version.
    * solved by creating a prefix using some assetId and pushing each version inside that `folder`. We can then query via `GET:{assetId}/{eventId}`
* create an s3Service **done**
* move bucket versioning logic to alternate endpoint
