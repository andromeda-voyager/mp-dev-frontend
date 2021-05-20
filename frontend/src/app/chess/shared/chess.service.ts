import { Injectable } from '@angular/core';
import { ChessMove } from './models/chess-move.model';
import { GameStatus, GameUpdate, PlayerStatus } from './models/game-update.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GameSettings } from './models/game-settings.model';
import { Color } from './models/color';
import { ChessboardService } from './chessboard.service';
import { environment } from 'src/environments/environment';

const baseUrl = environment.BASE_API_URL;
const chessMovePath = '/chess/move';
const playerStatusPath = '/chess/player-status';
const createGamePath = '/chess/game';
const listGamePath = '/chess/list-game';
const lobbyGamesPath = '/chess/lobby-games';
const joinChessGamePath = '/chess/join-game';

const UPDATE_INTERVAL = 8000;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class ChessService {
  private gameID: string = "";
  private playerID: string = "";
  private isConnectedOnline: boolean = false;
  private updateInterval: any;

  constructor(private http: HttpClient, private chessboardService: ChessboardService) {
    this.chessboardService.gameEnded$.subscribe(() => {
      this.disconnectFromOnlineGame();
    });
    this.chessboardService.playerMovedPiece$.subscribe(chessMove => {
      if (this.isConnectedOnline) {
        this.postChessMove(chessMove).subscribe(gameUpdate => {
          this.chessboardService.applyOpponentsMove(gameUpdate.chessMove);
        });
      }
      else {
        this.applyComputersMove();
      }
    }, error => this.handleError(error));
  }

  postPlayerUpdate(gameStatus: GameStatus, playerStatus: PlayerStatus): Observable<GameUpdate> {
    let gameUpdate: GameUpdate = {
      gameID: this.gameID,
      playerID: this.playerID,
      chessMove: new ChessMove(0,0),
      playerColor: Color.WHITE,
      opponentStatus: PlayerStatus.ACTIVE,
      gameStatus: gameStatus,
      playerStatus: playerStatus
    };
    return this.http.post<GameUpdate>(baseUrl + playerStatusPath, gameUpdate, httpOptions);
  }

  postChessMove(chessMove: ChessMove) {
    let gameUpdate: GameUpdate = {
      gameID: this.gameID,
      playerColor: Color.WHITE,
      playerID: this.playerID,
      gameStatus: GameStatus.ACTIVE,
      opponentStatus: PlayerStatus.ACTIVE,
      playerStatus: PlayerStatus.ACTIVE,
      chessMove: chessMove
    };
    return this.http.post<GameUpdate>(baseUrl + chessMovePath, gameUpdate, httpOptions);
  }

  postCreateChessGame(gameSettings: GameSettings) {
    return this.http.post<GameUpdate>(baseUrl + createGamePath, gameSettings, httpOptions);
  }

  checkGameStatus(gameUpdate: GameUpdate) {
    if (gameUpdate.gameStatus == GameStatus.OVER) {
      this.chessboardService.opponentQuit(gameUpdate.opponentStatus)
    };
  }

  getLobbyGames() {
    return this.http.get<GameSettings[]>(baseUrl + lobbyGamesPath, httpOptions);
  }

  listGameOnLobby(gameUpdate: GameUpdate) {
    this.startServerUpdateInterval(gameUpdate);
    return this.http.post<GameUpdate>(baseUrl + listGamePath, gameUpdate, httpOptions);
  }

  joinChessGame(gameSettings: GameSettings) {
    return this.http.post<GameUpdate>(baseUrl + joinChessGamePath, gameSettings, httpOptions);
  }

  startServerUpdateInterval(gameUpdate: GameUpdate) {
    this.isConnectedOnline = true;
    this.gameID = gameUpdate.gameID;
    this.playerID = gameUpdate.playerID;
    this.updateInterval = setInterval(() => {
      this.postPlayerUpdate(GameStatus.ACTIVE, PlayerStatus.ACTIVE).subscribe(gameUpdate => {
        this.checkGameStatus(gameUpdate);
      }, error => this.handleError(error));
    }, UPDATE_INTERVAL);
  }

  handleError(error: any) {
    clearInterval(this.updateInterval);
    this.chessboardService.endGame("Failed to connect to server. Game ended.");
  }

  startOnlineGame(gameUpdate: GameUpdate) {
    this.chessboardService.startGame(gameUpdate.playerColor);
    if (gameUpdate.playerColor == Color.BLACK) {
      this.postChessMove(new ChessMove(0,0)).subscribe(gameUpdate =>
        this.chessboardService.applyOpponentsMove(gameUpdate.chessMove)
      ), (error:Error) => this.handleError(error);
    }
  }

  startComputerGame(playerColor: Color) {
    this.isConnectedOnline = false;
    if (playerColor == Color.RANDOM) {
      playerColor = Math.floor(Math.random() * 2) == 0 ? Color.WHITE : Color.BLACK;
    }
    this.chessboardService.startGame(playerColor);

    if (playerColor == Color.BLACK) {
      this.applyComputersMove();
    }
  }

  applyComputersMove() {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('./chess.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.chessboardService.applyOpponentsMove(data);
      };
      worker.postMessage(this.chessboardService.getChessboard());
    } else {
      console.log("web worker not supported")
    }
  }

  disconnectFromOnlineGame() {
    clearInterval(this.updateInterval);
    this.isConnectedOnline = false;
  }

  resign() {
    if (this.isConnectedOnline) {
      this.postPlayerUpdate(GameStatus.OVER, PlayerStatus.RESIGNED).subscribe();
      this.disconnectFromOnlineGame();
    }
  }

}
