import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-astronomy',
  templateUrl: './astronomy.component.html',
  styleUrls: ['./astronomy.component.css']
})
export class AstronomyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  images = [
    "assets/images/astronomy/europa.jpg",
    "assets/images/astronomy/jupiter.jpg",
    "assets/images/astronomy/marsrover.jpg",
    "assets/images/astronomy/saturn.jpg"
  ];

}
