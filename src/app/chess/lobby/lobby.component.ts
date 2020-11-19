import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameSettings } from '../shared/models/game-settings.model';
import { Color } from '../shared/models/color';
import { ChessService } from '../shared/chess.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

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
  readonly updateInterval = interval(10000);
  retryUpdate = true;
  subscription: Subscription;
  message: string;
  messageInterval: any;


  constructor(private chessService: ChessService, private router: Router) { }

  ngOnInit(): void {
    this.updateLobby();
    this.subscription = this.updateInterval.subscribe(() => this.updateLobby());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    }, error => {
      this.handleError(error);
    });
  }

  showRetryMessage(timeLeft: number) {
    if (this.retryUpdate) {
      if (timeLeft > 0) {
        this.messageInterval = setTimeout(() => {
          this.message = `Failed to connect to the server. Retrying in ${--timeLeft} second(s).`;
          this.showRetryMessage(timeLeft)
        }, 1000);
      } else {
        this.retryUpdate = false;
        this.message = "";
      }
    }
    else {
      this.message = "Failed to connect to the server.";
      this.subscription.unsubscribe();
    }
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
    this.message = null;
  }

  joinGameOnClick(gameSettings: GameSettings) {
    gameSettings.password = this.password;
    this.chessService.joinChessGame(gameSettings).subscribe(gameUpdate => {
      this.chessService.startServerUpdateInterval(gameUpdate);
      this.chessService.startOnlineGame(gameUpdate);
    }, error => {
      this.handleError(error);
    });
  }

  handleError(error: any) {
    if (error.status == 401) {
      this.isPasswordCorrect = false;
    } else if (error.status == 404) {
      this.message = "Failed to join game. Game no longer exists."
    } else if (error.status == 400) {
      this.message = "The server did not process request. Please try reloading this page."
    } else {
      this.showRetryMessage(9);
    }
  }
}
