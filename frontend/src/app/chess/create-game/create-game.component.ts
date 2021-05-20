import { Component, OnInit, Input } from '@angular/core';
import { ChessService } from '../shared/chess.service';
import { GameSettings } from '../shared/models/game-settings.model';
import { Color } from '../shared/models/color';
import { GameUpdate } from '../shared/models/game-update.model';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})

export class CreateGameComponent implements OnInit {
  @Input() gameSettings: GameSettings = {
    isPVP: false,
    isPasswordLocked: false,
    playerColor: Color.RANDOM,
    password: "",
    description: "",
    gameID: "",
  };
  showRequired: boolean = false;
  waitingForOpponent = false;
  message: string = "";

  constructor(private chessService: ChessService) { }

  ngOnInit(): void { }

  createGameOnClick() {
    if (this.hasValidFields()) {
      if (this.gameSettings.isPVP) {
        this.chessService.postCreateChessGame(this.gameSettings).subscribe(gameUpdate => {
          this.listGameOnLobby(gameUpdate);
        }, () => this.message = "Failed to create online game. Unable to connect to the server.");
      } else {
        this.chessService.startComputerGame(this.gameSettings.playerColor);
      }
    } else this.highlightRequiredFields();
  }

  listGameOnLobby(gameUpdate: GameUpdate) {
    this.waitingForOpponent = true;
    this.chessService.listGameOnLobby(gameUpdate).subscribe(gameUpdate => {
      this.chessService.startOnlineGame(gameUpdate);
    }, () => {
      this.waitingForOpponent = false;
      this.message = "Failed to list game in the lobby. Please create another game."
      this.chessService.disconnectFromOnlineGame();
    });
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
