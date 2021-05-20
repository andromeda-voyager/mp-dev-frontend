import { Component, OnInit } from '@angular/core';
import { MOVIES } from './movie-data';
import { FilmData } from './film-data';
import { DIRECTORS } from './director-data';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})

export class CinemaComponent implements OnInit {

  selectedIndex:number = -1;
  movies = MOVIES;
  directors = DIRECTORS;
  selectedCategory: FilmData[] = this.movies;

  constructor() { }

  ngOnInit() { }
  
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  onItemClick(itemIndex: number, target: HTMLElement) {
    this.selectedIndex = itemIndex;
    if (this.selectedCategory[itemIndex].name == "Annihilation") this.scroll(target)
  }

  viewFilmsOnClick() {
    this.selectedCategory = this.movies;
  }

  viewDirectorsOnClick() {
    this.selectedCategory = this.directors;
    this.selectedIndex = -1;
  }
}
