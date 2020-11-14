import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/recommend-books/shared/book.service';
import { Book } from 'src/app/recommend-books/shared/book';
import { animate, state, stagger, query, style, transition, trigger } from '@angular/animations';
import { BookCover } from '../science-fiction/book-cover';

@Component({
  selector: 'app-science-fiction',
  templateUrl: './science-fiction.component.html',
  styleUrls: ['./science-fiction.component.css'],
  animations: [
    trigger('fadeIn', [
      state('true', style({
        opacity: 0,
      })),
      state('false', style({
        opacity: 1,
      })),
      transition('* => false', [
        animate('3s'),
      ]),
      transition('* => true', [
        animate('3s')
      ])
    ])
  ]
})

export class ScienceFictionComponent implements OnInit {
  interval: any;


  books: BookCover[] = [
    { imageURL: "assets/images/science-fiction/dune.jpeg", link: "https://www.penguinrandomhouse.com/books/352036/dune-deluxe-edition-by-frank-herbert/", state:false},
    { imageURL: "assets/images/science-fiction/hyperion.jpeg", link: "https://www.penguinrandomhouse.com/books/167468/hyperion-by-dan-simmons/9780385263481", state:false },
    { imageURL: "assets/images/science-fiction/godsthemselves.jpeg", link: "https://www.penguinrandomhouse.com/books/5789/the-gods-themselves-by-isaac-asimov/9780553288100", state:false },
    { imageURL: "assets/images/science-fiction/foundation.jpeg", link: "https://www.penguinrandomhouse.com/books/5655/foundation-by-isaac-asimov/9780553293357", state:false },
    { imageURL: "assets/images/science-fiction/stranger.jpg", link: "https://www.penguinrandomhouse.com/books/538963/stranger-in-a-strange-land-by-robert-a-heinlein/", state:false }
  ];
  
  constructor() {
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.vanish();
    }, 10000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
  
  async vanish() {
    var index = Math.floor(Math.random() * (this.books.length - 1));
    this.books[index].state = true;
    await this.delay(6000);
    this.books[index].state = false;


  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
