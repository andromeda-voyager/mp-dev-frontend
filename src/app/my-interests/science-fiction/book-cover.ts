export class BookCover {
    state: boolean = false;
    imageURL: string;
    link: string;

    constructor(imageURL: string, link: string) {
        this.imageURL = imageURL;
        this.link = link;
}
}