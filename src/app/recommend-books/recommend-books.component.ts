import { Book, BookRecommendation } from 'src/app/recommend-books/shared/book';
import { BookService } from 'src/app/recommend-books/shared/book.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recommend-books',
  templateUrl: './recommend-books.component.html',
  styleUrls: ['./recommend-books.component.css']
})
export class RecommendBooksComponent implements OnInit {

  @Input() recommender: string;
  isNameSubmitted: boolean = false;

  constructor(private bookService: BookService) { }

  ngOnInit() { }

  submitName(): void {
    this.isNameSubmitted = true;
    this.bookService.setRecommender(this.recommender);
  }
  
}