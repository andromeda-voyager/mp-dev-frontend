import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})

export class CarouselComponent implements OnInit {
  @Input() carouselItems: string[] = [];
  currentIndex = 0;
  nextIndex = 1;
  interval: any;
  @Input() arrowsOn: boolean = false;
  @Input() buttonsOn: boolean = false;
  @Input() slideShowSpeed: number = 7000;
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

  moveCarousel() {
    this.currentIndex = this.nextIndex;
    const next = this.nextIndex + 1;
    this.nextIndex = next === this.carouselItems.length ? 0 : next;
  }

  getNextCarouselItem() {
    const next = this.currentIndex + 1;
    return next === this.carouselItems.length ? 0 : next;
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
    const previous = this.currentIndex - 1;
    this.currentIndex = previous < 0 ? this.carouselItems.length - 1 : previous;
  }

  onNextClick() {
    this.resetCarouselTimer();
    this.moveCarousel();
  }

  changeImage(imageIndex: number) {
    if (imageIndex == this.currentIndex) {
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