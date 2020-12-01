import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/recommend-books/shared/book';
import { BookService } from 'src/app/recommend-books/shared/book.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {
  @Input() book: Book;
  @Input() recommender: string;
  recommendedBooks: Book[];
  recommendationsSubmitted: boolean = false;

  constructor(private bookService: BookService) {
    this.recommendedBooks = new Array();
    this.recommendationsSubmitted = true;
    this.bookService.bookRecommended$.subscribe(
      book => {
        this.recommendedBooks.push(book);
      });
  }

  ngOnInit() { }

  // bookUnrecommended(book: Book) { 
  //   const index = this.recommendedBooks.indexOf(book, 0);
  //   if (index > -1) {
  //     this.recommendedBooks.splice(index, 1);
  //   }
  // }
}