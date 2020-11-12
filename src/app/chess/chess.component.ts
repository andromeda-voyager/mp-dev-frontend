import { Component, OnInit } from '@angular/core';
import { ChessService } from './shared/chess.service';
import { ChessboardService } from './shared/chessboard.service';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css']
})
export class ChessComponent implements OnInit {

  showChessboard: boolean = false;
  waitingForOpponent: boolean = false;

  constructor(private chessService: ChessService, private chessboardService: ChessboardService) { }

  ngOnInit(): void {
    this.chessboardService.gameStarted$.subscribe(() => {
      this.waitingForOpponent = false;
      this.showChessboard = true;
    });
  }

  ngOnDestroy() {
    this.chessService.disconnectFromOnlineGame();
  }

  exitOnClick() {
    this.waitingForOpponent = false;
    this.chessService.disconnectFromOnlineGame();
  }

  onWaitForOpponent() {
    this.waitingForOpponent = true;
  }

  onLeaveChessboard() {
    this.showChessboard = false;
  }
}