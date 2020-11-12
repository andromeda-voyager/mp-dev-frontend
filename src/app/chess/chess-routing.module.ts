import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { ChessComponent } from './chess.component';


const routes: Routes = [
  { path: 'chess', component: ChessComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class ChessRoutingModule { }
