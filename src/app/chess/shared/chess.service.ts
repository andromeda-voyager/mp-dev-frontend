import { Injectable } from '@angular/core';
import { ChessMove } from './models/chess-move.model';
import { GameStatus, GameUpdate, PlayerStatus, ServerMessage } from './models/game-update.model';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GameSettings } from './models/game-settings.model';
import { Color } from './models/color';
import { ChessboardService } from './chessboard.service';
import { environment } from 'src/environments/environment';

const baseUrl = environment.BASE_API_URL;
const chessMovePath = '/chess-move';
const playerStatusPath = '/update-player-status';
const createGamePath = '/create-chess-game';
const listGamePath = '/list-chess-game';
const lobbyGamesPath = '/get-lobby-games';
const joinChessGamePath = '/join-chess-game';

const UPDATE_INTERVAL = 8000;

@Injectable({
  providedIn: 'root'
})

export class ChessService {
  private gameID: string;
  private playerID: string;
  private isOnlineGame: boolean;
  //private subscriptions: Subscription = new Subscription();
  private updateInterval: any;

  constructor(private http: HttpClient, private chessboardService: ChessboardService) {
    this.chessboardService.gameEnded$.subscribe(() => {
      this.disconnectFromOnlineGame();
    });
    this.chessboardService.playerMovedPiece$.subscribe(chessMove => {
      if (this.isOnlineGame) {
        this.postChessMove(chessMove).subscribe(gameUpdate => {
          this.processGameUpdate(gameUpdate)
        });
      }
      else {
        this.applyComputersMove();
      }
    });
  }

  disconnectFromOnlineGame() {
    clearInterval(this.updateInterval);
    this.postPlayerUpdate(GameStatus.OVER, PlayerStatus.DISCONNECTED).subscribe();
  }

  resign() {
    if (this.isOnlineGame) { // is null if game against computer
      this.postPlayerUpdate(GameStatus.OVER, PlayerStatus.RESIGNED).subscribe();
      this.disconnectFromOnlineGame();
    }
  }

  postPlayerUpdate(gameStatus: GameStatus, playerStatus: PlayerStatus): Observable<GameUpdate> {
    let gameUpdate: GameUpdate = {
      gameID: this.gameID,
      playerID: this.playerID,
      gameStatus: gameStatus,
      playerStatus: playerStatus
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<GameUpdate>(baseUrl + playerStatusPath, gameUpdate, httpOptions);
  }

  postChessMove(chessMove: ChessMove) {
    let gameUpdate: GameUpdate = {
      gameID: this.gameID,
      playerID: this.playerID,
      gameStatus: GameStatus.ACTIVE,
      playerStatus: PlayerStatus.ACTIVE,
      chessMove: chessMove
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<GameUpdate>(baseUrl + chessMovePath, gameUpdate, httpOptions);
  }

  postCreateChessGame(gameSettings: GameSettings) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<GameUpdate>(baseUrl + createGamePath, gameSettings, httpOptions);
  }

  checkGameStatus(gameUpdate: GameUpdate) {
    if (gameUpdate.gameStatus == GameStatus.OVER) {
      this.chessboardService.opponentQuit(gameUpdate.opponentStatus)
    };
  }

  getLobbyGames() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'my-auth-token'
      })
    };
    return this.http.get<GameSettings[]>(baseUrl + lobbyGamesPath, httpOptions);
  }

  listGameOnLobby(gameUpdate: GameUpdate) {
    this.startServerUpdateInterval(gameUpdate);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<GameUpdate>(baseUrl + listGamePath, gameUpdate, httpOptions);
     
  }

  joinChessGame(gameSettings: GameSettings) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'my-auth-token'
      })
    };
   return this.http.post<GameUpdate>(baseUrl + joinChessGamePath, gameSettings, httpOptions);
  }

  startServerUpdateInterval(gameUpdate: GameUpdate) {
    this.gameID = gameUpdate.gameID;
    this.playerID = gameUpdate.playerID;
    this.updateInterval = setInterval(() => {
      this.postPlayerUpdate(GameStatus.ACTIVE, PlayerStatus.ACTIVE).subscribe(gameUpdate => {
        this.checkGameStatus(gameUpdate);
      });
    }, UPDATE_INTERVAL);
  }

  startOnlineGame(gameUpdate: GameUpdate) {
    this.isOnlineGame = true;
    this.chessboardService.startGame(gameUpdate.playerColor);
    if (gameUpdate.playerColor == Color.BLACK) {
      this.postChessMove(null).subscribe(gameUpdate => //chess move will be ignored
        this.processGameUpdate(gameUpdate)
      );
    }
  }

  startComputerGame(playerColor: Color) {
    this.isOnlineGame = false;
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
      const worker = new Worker('./chess.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        this.chessboardService.validateOpponentsMove(data);
      };
      worker.postMessage(this.chessboardService.getChessboard());
    } else {
      console.log("web worker not supported")
    }
  }

  processGameUpdate(gameUpdate: GameUpdate) {
    if (gameUpdate.serverMessage) {
      console.log("Server returned message: " + gameUpdate.serverMessage);
    }
    else {
      this.chessboardService.validateOpponentsMove(gameUpdate.chessMove);
    }
  }
}
