import { ChessMove } from './chess-move.model';
import { Color } from './color';

export interface GameUpdate {
    gameID: string;
    playerID: string;
    chessMove?: ChessMove;
    playerColor?: Color;
    playerStatus?: PlayerStatus;
    opponentStatus?: PlayerStatus;
    gameStatus: GameStatus;
    serverMessage?: ServerMessage; 
}

export enum GameStatus {
    ACTIVE = "ACTIVE",
    CHECKMATE = "CHECKMATE",
    STALEMATE = "STALEMATE",
    UNLISTED = "UNLISTED",
    IN_LOBBY = "IN_LOBBY",
    OVER = "OVER"
}

export enum ServerMessage {
    TIMED_OUT = "TIMED_OUT",
    FAILED_TO_JOIN = "FAILED_TO_JOIN",
    WRONG_PASSWORD = "WRONG_PASSWORD",
}

export enum PlayerStatus {
    ACTIVE = "ACTIVE",
    RESIGNED = "RESIGNED",
    DISCONNECTED = "DISCONNECTED"
}