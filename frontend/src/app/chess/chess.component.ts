import { Component, OnInit } from '@angular/core';
import { ChessService } from './shared/chess.service';
import { ChessboardService } from './shared/chessboard.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css']
})
export class ChessComponent implements OnInit {

  showChessboard: boolean = false;
  tabLinks = [
    { path: 'create-game', label: 'Create Game' },
    { path: 'join-game', label: 'Join Game' },
  ];

  constructor(private location: Location, private chessService: ChessService, private chessboardService: ChessboardService) { }

  ngOnInit(): void {
    this.chessboardService.gameStarted$.subscribe(() => {
      this.showChessboard = true;
      this.location.replaceState("/chess/game");
    });
  }

  ngOnDestroy() {
    this.chessService.disconnectFromOnlineGame();
  }

  disconnect() {
    this.chessService.disconnectFromOnlineGame();
  }

  onLeaveChessboard() {
    this.showChessboard = false;
    this.location.replaceState("/chess/create-game");

  }
}