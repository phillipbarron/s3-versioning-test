# Test code for using s3 a storage solution for versioned documents

## Install

```bash
npm i
```

## Run

```bash
npm run dev
```

provides 2 endpoints:

`POST: localhost:3000/{assetId}`
`GET: localhost:3000/{assetId}{eventId}`

`eventIds` are returned from the POST endpoint

## todo

* install basic express app **done**
* set up a bucket **done**
* get wormhole access (maybe cps wormhole) **done**
* add route to add / update asset with /{assetId}signature **done**
* add route to get all versions
  * can we filter versions on meta-data - would be better for this to be done via s3 - does not appear to be possible - listing all versions does not return the user supplied metadata so there is no way to find the correct s3 version without getting each object version.
* create an s3Service **done**
* is there swagger for node? - there is but not sure it can be integrated retrospectively
* get ready for a demo