import { BookService } from 'src/app/recommend-books/shared/book.service';
import { Component, OnInit, Input } from '@angular/core';
import { Book } from './shared/book';

@Component({
  selector: 'app-recommend-books',
  templateUrl: './recommend-books.component.html',
  styleUrls: ['./recommend-books.component.css']
})
export class RecommendBooksComponent implements OnInit {

  isNameSubmitted: boolean = false;

  books: Book[] = [];
  @Input() recommender: string = "";
  @Input() title: string = "";
  @Input() author: string = "";
  recommendedBooks: Book[] = []

  constructor(private bookService: BookService) {
    this.bookService.bookRecommended$.subscribe(
      book => {
        this.recommendedBooks.push(book);
      });
  }

  ngOnInit() { }

  
  submitName(): void {
    this.isNameSubmitted = true;
  }
  
  submitSearchQuery(): void {
    let query = "";
    if (this.title) query = "title=" + this.title;
    if (this.author) {
      if (this.title) query += "&";
      query += "author=" + this.author;
    }
    this.bookService.searchBooks(query).subscribe(books => this.books = books);
  }

}