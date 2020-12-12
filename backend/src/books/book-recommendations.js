'use strict';

module.exports = class BookRecommendations {

    constructor(Books, Recommendor) {
        this.Recommendor = Recommendor;
        this.Books = Books;
    }
}
