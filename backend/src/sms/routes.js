const router = require('express').Router(),
    path = require('path');

router.post('/reply', async (request, response) => {
    try {
        response.contentType('application/xml');
        response.sendFile(path.join(__dirname, "/sms.xml"));
    } catch (error) {
        console.log(error);
        response.status(400).send('An error occured on the server. /sms/reply');
    }
});

module.exports = router;