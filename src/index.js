const express = require('express')
const s3Service = require('./s3-service');
const app = express()
const port = 3000

app.use(express.json());
app.get('/', (req, res) => res.send('now make this work'));

app.post('/:assetId', async (req, res) => {
    const contentToSendToS3 = req.body;
    try {
        const updateResponse = await s3Service.updateDocument(req.params.assetId, contentToSendToS3);
        res.json({
            updateResponse
        });
    } catch (error) {
        res.status(500).json({
            error,
            contentToSendToS3,
            asset: req.params.assetId
        })
    }
});

app.get('/:assetId/:eventId', async (req, res) => {
    try {
        console.log('we are doing this');
        const { assetId, eventId } = req.params;
        const version = await s3Service.getEventVersion(eventId, assetId);
        res.json({
            version
        });
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});


app.listen(port, () => console.log(`json doc api listening on ${port}!`))