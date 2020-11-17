import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})

export class CarouselComponent implements OnInit {
  @Input() carouselItems: string[];
  currentCarouselItem = 0;
  interval: any;
  @Input() arrowsOn: boolean = false;
  @Input() buttonsOn: boolean = false;
  @Input() slideShowSpeed:number = 7000;
  constructor() { }

  setCarouselInterval() {
    this.interval = setInterval(() => {
      this.moveCarousel();
    }, this.slideShowSpeed);
  }

  moveCarousel() {
    const next = this.currentCarouselItem + 1;
    this.currentCarouselItem = next === this.carouselItems.length ? 0 : next;
  }

  resetCarouselTimer() {
    clearInterval(this.interval);
    this.setCarouselInterval();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  onPreviousClick() {
    this.resetCarouselTimer();
    const previous = this.currentCarouselItem - 1;
    this.currentCarouselItem = previous < 0 ? this.carouselItems.length - 1 : previous;
  }

  onNextClick() {
    this.resetCarouselTimer();
    this.moveCarousel(); 
  }

  ngOnInit() {
    this.preloadImages();
    this.setCarouselInterval();
  }

  preloadImages() {
    for (let caourselItem of this.carouselItems) {
      var img = new Image();
      img.src = caourselItem;     
    }
  }

  changeImage(imageIndex: number) {
    this.resetCarouselTimer();
    this.currentCarouselItem = imageIndex;
  }

}