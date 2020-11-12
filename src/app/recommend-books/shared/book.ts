export class Book {
    bookID: number;
    title: string;
    author: string;
    Recommended: boolean;
    state: boolean;
    imageURL: string;
}

export class BookRecommendation {
    constructor(book: Book, recommender: string) {
            this.book = book;
            this.recommender = recommender;
    }
    book: Book;
    recommender: string;
}

