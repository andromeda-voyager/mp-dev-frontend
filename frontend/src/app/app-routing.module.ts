import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyInterestsComponent } from './interests/interests.component';
import { HomeComponent } from './home/home.component';
import { RecommendBooksComponent } from './recommend-books/recommend-books.component';
import { ChessComponent } from './chess/chess.component';
import { CreateGameComponent } from './chess/create-game/create-game.component';
import { LobbyComponent } from './chess/lobby/lobby.component';

const routes: Routes = [
  { path: 'hobbies-and-interests', component: MyInterestsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recommend-books', component: RecommendBooksComponent },
  {
    path: 'chess', component: ChessComponent,
    children: [
      { path: 'create-game', component: CreateGameComponent },
      { path: 'join-game', component: LobbyComponent },
      { path: '**', redirectTo: 'create-game'},
    ]
  },
  // { path: '', redirectTo: '/home', pathMatch:'full'},
  { path: '**', redirectTo: '/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }