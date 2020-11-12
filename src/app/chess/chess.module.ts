import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChessRoutingModule } from './chess-routing.module';
import { CreateGameComponent } from './create-game/create-game.component';
import { LobbyComponent } from './lobby/lobby.component';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';
import { ChessComponent } from './chess.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PawnPromotionComponent } from './pawn-promotion/pawn-promotion.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChessGameComponent, ConfirmResignDialog } from './chess-game/chess-game.component';

@NgModule({
  declarations: [ChessboardComponent, CreateGameComponent, LobbyComponent, ChessComponent, PawnPromotionComponent, ConfirmResignDialog, ChessGameComponent],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    ChessRoutingModule,
    MatFormFieldModule,
    MatDialogModule,
  ]
})
export class ChessModule { }