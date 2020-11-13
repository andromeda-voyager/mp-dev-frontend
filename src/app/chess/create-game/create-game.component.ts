import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChessService } from '../shared/chess.service';
import { GameSettings } from '../shared/models/game-settings.model';
import { Color } from '../shared/models/color';
import { Router } from '@angular/router';
import { ChessboardService } from '../shared/chessboard.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})

export class CreateGameComponent implements OnInit {
  // @Input() chessGame: ChessGame;
  @Input() gameSettings: GameSettings = {isPVP: false, isPasswordLocked:false, playerColor: Color.RANDOM, password:"", description:""};
  showRequired: boolean = false;
  waitingForOpponent = false;
  constructor(private chessService: ChessService, private router: Router, private chessboardService: ChessboardService) {
  }

  ngOnInit(): void { }

  createGameOnClick() {
    if (this.hasValidFields()) {
      this.chessService.createChessGame(this.gameSettings);
      if (this.gameSettings.isPVP) {
        console.log("wait emit");
        this.waitingForOpponent = true;}
    } else this.highlightRequiredFields();
  }

  highlightRequiredFields() {
    this.showRequired = true;
  }
  
  exitOnClick() {
    this.waitingForOpponent = false;
    this.chessService.disconnectFromOnlineGame();
  }

  hasValidFields() {
    if (this.gameSettings.isPVP) {
      if (this.gameSettings.description == "") return false;
      if (this.gameSettings.isPasswordLocked) {
        return (this.gameSettings.password != "")
      }
    }
    return true;
  }
}
