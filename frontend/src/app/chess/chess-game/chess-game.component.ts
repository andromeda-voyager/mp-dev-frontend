import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChessService } from '../shared/chess.service';
import { ChessboardService } from '../shared/chessboard.service';
import { Color } from '../shared/models/color';

@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.css']
})

export class ChessGameComponent implements OnInit {

  leaveButtonText = "Resign";
  isGameActive = true;
  gameMessage: string = "";
  Color = Color;
  @Output() leaveChessboard = new EventEmitter();

  constructor(private chessService: ChessService, private chessboardService: ChessboardService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.chessboardService.gameMessage$.subscribe(message => {
      this.gameMessage = message;
    });
    this.chessboardService.gameEnded$.subscribe(() => {
      this.isGameActive = false;
      this.leaveButtonText = "Leave";
    })
  }

  ngOnDestroy() {
    if (this.isGameActive) {
      this.chessService.resign();
    }
  }

  openResignDialog() {
    if (this.isGameActive) {
      const dialogRef = this.dialog.open(ConfirmResignDialog);
      dialogRef.afterClosed().subscribe(resigned => {
        if (resigned) {
          this.chessService.resign();
          this.leaveChessboard.emit();
        }
      });
    } else this.leaveChessboard.emit();
  }

}

@Component({
  selector: 'confirm-resign-dialog',
  templateUrl: 'confirm-resign-dialog.html',
  styleUrls: ['./chess-game.component.css']
})
export class ConfirmResignDialog { }