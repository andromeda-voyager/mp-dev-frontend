const router = require('express').Router(),
    search = require('./book-search');
//  database = require('./database'),

router.post('/recommend', async (request, response) => {
    try {
        // await database.insertIntoRecommendations(request.body);
        search.printRecommendation(request.body);
        response.status(200).send(request.body);
    } catch (error) {
        console.log(error);
        response.status(400).send('An error occured on the server. /recommend-book');
    }
});

router.get('/search', async (request, response) => {
    try {
        var books = await search.searchGoogleBooks(request.query["title"], request.query["author"]);
        response.send(books);
    }
    catch {
        response.status(400).send('An error occured on the server. /book-search');
    }
});

module.exports = router;