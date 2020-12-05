import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChessComponent } from './chess.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
  {
    path: 'chess', component: ChessComponent,
    children: [
      { path: 'create-game', component: CreateGameComponent },
      { path: 'join-game', component: LobbyComponent },
      { path: '**', redirectTo: 'create-game'},
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class ChessRoutingModule { }
