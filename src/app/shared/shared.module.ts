import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { RaisedDirective } from './raised.directive';



@NgModule({
  declarations: [CarouselComponent, RaisedDirective],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
