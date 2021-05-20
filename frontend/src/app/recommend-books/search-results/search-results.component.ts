import { Component, Input, OnInit } from '@angular/core';
import { BookService } from 'src/app/recommend-books/shared/book.service';
import { Book } from 'src/app/recommend-books/shared/book';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})

export class SearchResultsComponent implements OnInit {
  @Input() books: Book[] = [];
  @Input() recommender: string = "";

  constructor(private bookService: BookService) { }

  ngOnInit(): void { }

  recommendBook(book: Book) {
    book.Recommended = true;
    this.bookService.recommendedBook({ book: book, recommendedBy: this.recommender }).subscribe();
  }

  onSelect(book: Book): void {
    if (!book.Recommended) {
      this.recommendBook(book);
    }
  }
}
