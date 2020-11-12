import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyInterestsRoutingModule } from './my-interests-routing.module';
import { MyInterestsComponent } from './my-interests.component';
import { CarouselComponent } from 'src/app/shared/carousel/carousel.component';
import { CinemaComponent } from './cinema/cinema.component';
import { VideoGamesComponent } from './video-games/video-games.component';
import { RouterModule } from '@angular/router';
import { AstronomyComponent } from './astronomy/astronomy.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScienceFictionComponent } from './science-fiction/science-fiction.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    CarouselComponent,
    MyInterestsComponent,
    CinemaComponent,
    VideoGamesComponent,
    AstronomyComponent,
    ScienceFictionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MyInterestsRoutingModule,
    RouterModule,
    DragDropModule,
    MatRippleModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule
  ]
})
export class MyInterestsModule { }
