const https = require('https')
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

class Book {
    constructor(title, author, genre, imageURL, ID) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.imageURL = imageURL;
        this.ID = ID;
    }
}

function parseBookData(bookData) { 
    let books = [];
    for (var book of bookData.items) { //TODO if items in results is 0 bug
        try {
            books.push(new Book(
                book.volumeInfo.title,
                book.volumeInfo.authors[0],
                book.volumeInfo.categories[0],
                book.volumeInfo.imageLinks.thumbnail.replace("http://", "https://")));
        }
        catch (e) { //book discarded because it is missing information
        }
    }
    return books;
}

function createSearchQuery(title, author) {
    let searchQuery = GOOGLE_BOOKS_API_URL;
    if (title) {
        searchQuery += "intitle:" + title;
        if (author) searchQuery += "+";
    }
    if (author) searchQuery += "inauthor:" + author;

    return searchQuery;
}

async function bookSearch(searchURL) {
    return new Promise(function (resolve, reject) {
        https.get(searchURL, (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
            }
            if (error) {
                console.error(error.message);
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(rawData));
                } catch (e) {
                    console.error(e.message);
                }
            });

        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    })
}

function printRecommendation(recommendation) {
    console.log("Book Recommendation:\ntitle: " +
                recommendation.book.title + 
                "\nAuthor: " + recommendation.book.author + 
                "\nRecommended by: " + recommendation.recommendedBy);
}

module.exports =
{
    searchGoogleBooks: async function (title, author) {
        let query = createSearchQuery(title, author);
        const data = await bookSearch(query)
        return parseBookData(data)
    },
    printRecommendation
};

