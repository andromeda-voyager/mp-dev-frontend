import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RecommendBooksModule } from 'src/app/recommend-books/recommend-books.module';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { ChessboardComponent } from './chess/chessboard/chessboard.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateGameComponent } from './chess/create-game/create-game.component';
import { LobbyComponent } from './chess/lobby/lobby.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ChessComponent } from './chess/chess.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PawnPromotionComponent } from './chess/pawn-promotion/pawn-promotion.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChessGameComponent, ConfirmResignDialog } from './chess/chess-game/chess-game.component';
import { MyInterestsComponent } from './interests/interests.component';
import { CarouselComponent } from 'src/app/shared/carousel/carousel.component';
import { CinemaComponent } from './interests/cinema/cinema.component';
import { VideoGamesComponent } from './interests/video-games/video-games.component';
import { RouterModule } from '@angular/router';
import { AstronomyComponent } from './interests/astronomy/astronomy.component';
import { ScienceFictionComponent } from './interests/science-fiction/science-fiction.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChessboardComponent,
    LobbyComponent,
    CreateGameComponent,
    ChessComponent,
    ChessGameComponent,
    ConfirmResignDialog,
    MyInterestsComponent,
    CarouselComponent,
    CinemaComponent,
    VideoGamesComponent,
    AstronomyComponent,
    ScienceFictionComponent,
    PawnPromotionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRippleModule,
    MatCheckboxModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    RecommendBooksModule,
    DragDropModule,
    MatTabsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
