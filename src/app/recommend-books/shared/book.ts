export interface Book {
    bookID: number;
    title: string;
    author: string;
    Recommended: boolean;
    state: boolean;
    imageURL: string;
}

export interface BookRecommendation {
    book: Book;
    recommendedBy: string;
}

