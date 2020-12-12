const router = require('express').Router(),
    uploads = require('./uploads');

uploads.createUploadFolder();
setInterval(() => {
    uploads.removeExpiredFiles();
}, 150000); // 2.5 minutes

router.post('/upload-image', async (request, response) => {
    try {
        response.status(200).send(uploads.uploadImage(request.body));
    } catch (error) {
        console.log(error);
        response.status(400).send('An error occured on the server. /upload-image');
    }
});

module.exports = router;