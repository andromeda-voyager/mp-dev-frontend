import { Component, OnInit, Input } from '@angular/core';
import { BookService } from 'src/app/recommend-books/shared/book.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
 
  @Input() title: string;
  @Input() author: string;
  @Input() recommender: string;
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }



  submitSearchQuery(): void {
    let query = "";
    if (this.title) query = "title=" + this.title;
    if (this.author) {
      if (this.title) query += "&";
      query += "author=" + this.author;
    }
    // this.bookService.searchBooks(query).subscribe(books => this.books = books);
    this.bookService.newBookSearch(query);
  }

}
