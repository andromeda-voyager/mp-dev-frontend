import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Book } from 'src/app/recommend-books/shared/book';
import { BookService } from 'src/app/recommend-books/shared/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() book: Book;

  @Output() removeRecommendation = new EventEmitter<Book>();
  @Output() addRecommendation = new EventEmitter<Book>();

  constructor(private bookService: BookService) { }

  ngOnInit() {
  }

  onSelect(): void {
    if (this.book.Recommended) {
      this.unrecommendBook();
    } else this.recommendBook();
  }

  recommendBook() {
    this.book.Recommended = true;
    this.bookService.recommendBook(this.book);
  }
  
  unrecommendBook(){
    this.book.Recommended = false;
    this.bookService.unrecommendBook(this.book);
  }


}