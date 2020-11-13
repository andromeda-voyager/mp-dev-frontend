import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { ChessComponent } from './chess.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
  { path: 'chess', component: ChessComponent,
    children: [
      { path: '', redirectTo: 'create-game', pathMatch: 'full' },
      { path: 'create-game', component: CreateGameComponent },
      { path: 'join-game', component: LobbyComponent },
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
