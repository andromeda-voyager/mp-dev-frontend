import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameSettings } from '../shared/models/game-settings.model';
import { Color } from '../shared/models/color';
import { ChessService } from '../shared/chess.service';
import { Router } from '@angular/router';
import { ServerMessage } from '../shared/models/game-update.model';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent implements OnInit {

  lobby: Map<string, GameSettings> = new Map();
  selectedGame: GameSettings;
  @Input() password: string = "";
  isPasswordCorrect: boolean = true;
  interval: any;


  constructor(private chessService: ChessService, private router: Router) { }

  ngOnInit(): void {
    this.updateLobby();
    this.interval = setInterval(() => {
      this.updateLobby();
    }, 10000);

    this.chessService.serverMessage$.subscribe(message => {
      if (message == ServerMessage.WRONG_PASSWORD) {
        this.isPasswordCorrect = false;
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  updateLobby() {
    this.chessService.getLobbyGames().subscribe(refrehedLobby => {
      const refreshedLobbyMap = new Map<string, GameSettings>(refrehedLobby.map(game => [game.gameID, game]));
      this.lobby.forEach(game => {
        if (!refreshedLobbyMap.has(game.gameID)) this.lobby.delete(game.gameID);
      });
      for (const game of refrehedLobby) {
        if (!this.lobby.has(game.gameID)) this.lobby.set(game.gameID, game);
      }
    });
  }

  getPawnImage(chessGame: GameSettings) {
    switch (chessGame.playerColor) {
      case Color.WHITE: return "/assets/chess-pieces/white_pawn.svg";
      case Color.BLACK: return "/assets/chess-pieces/black_pawn.svg";
      case Color.RANDOM: return "/assets/chess-pieces/random_pawn.png";
    }
  }

  onChessGameClick(chessGame: GameSettings) {
    this.isPasswordCorrect = true;
    this.selectedGame = chessGame;
  }

  joinGameOnClick(gameSettings: GameSettings) {
    gameSettings.password = this.password;
    this.chessService.joinChessGame(gameSettings);
  }
}
