import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/recommend-books/shared/book.service';
import { Book } from 'src/app/recommend-books/shared/book';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  books: Book[];
  constructor(private bookService: BookService) {
    bookService.searchQuery$.subscribe(
      searchQuery => {
        this.bookService.searchBooks(searchQuery).subscribe(books => this.books = books);

      });

    bookService.bookUnrecommended$.subscribe(
      book => {
        this.removeRecommendedTag(book);
        // this.history.push(`${astronaut} confirmed the mission`);
      });
  }

  ngOnInit(): void {
  }

  unrecommendBook(book: Book) {
    book.Recommended = false;
    this.bookService.unrecommendBook(book);
  }

  removeRecommendedTag(book: Book) {
    const index = this.books.indexOf(book, 0);
    if (index > -1) {
      this.books[index].Recommended = false;
    }
  }

  recommendBook(book: Book) {
    book.Recommended = true;
    this.bookService.recommendBook(book);
  }

  onSelect(book: Book): void {
    if (book.Recommended) {
      this.unrecommendBook(book);
    } else this.recommendBook(book);
  }
}
