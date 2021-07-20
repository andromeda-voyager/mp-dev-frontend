import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})

export class CarouselComponent implements OnInit {
  @Input() carouselItems: string[] = [];
  currentIndex = 0;
  interval: any;
  @Input() arrowsOn: boolean = false;
  @Input() buttonsOn: boolean = false;
  @Input() slideShowSpeed: number = 5000;
  isPaused = false;

  constructor() { }

  ngOnInit() {
    this.setCarouselInterval();
  }

  pause() {
    this.isPaused = true;
    clearInterval(this.interval);
  }

  unpause() {
    this.isPaused = false;
    this.setCarouselInterval();
  }

  setCarouselInterval() {
    this.interval = setInterval(() => {
      this.moveCarousel();
    }, this.slideShowSpeed);
  }

  nextIndex() {
    return this.currentIndex === this.carouselItems.length - 1 ? 0 : this.currentIndex + 1;
  }

  previousIndex() {
    return this.currentIndex === 0 ? this.carouselItems.length -1: this.currentIndex - 1;
  }

  moveCarousel() {
    this.currentIndex = this.nextIndex()
  }

  resetCarouselTimer() {
    clearInterval(this.interval);
    this.isPaused = false;
    this.setCarouselInterval();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  previousOnClick() {
    this.resetCarouselTimer();
    this.currentIndex = this.previousIndex();
  }

  nextOnClick() {
    this.resetCarouselTimer();
    this.moveCarousel();
  }

  changeImage(imageIndex: number) {
    if (imageIndex === this.currentIndex) {
      if (this.isPaused) this.unpause();
      else this.pause();
    }
    else {
      this.isPaused = false;
      this.resetCarouselTimer();
      this.currentIndex = imageIndex;
    }
  }

}