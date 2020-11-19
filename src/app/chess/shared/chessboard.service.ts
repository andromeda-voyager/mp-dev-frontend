import { Injectable } from '@angular/core';
import { Color } from './models/color';
import { ChessMove } from './models/chess-move.model';
import { Subject } from 'rxjs';
import { Chessboard } from './models/chessboard.model';
import { ChessPiece } from './models/chess-piece.model';
import { GameStatus, PlayerStatus } from './models/game-update.model';


@Injectable({
    providedIn: 'root'
})

export class ChessboardService {

    private playerMovedPieceSource = new Subject<ChessMove>();
    private opponentMovedPieceSource = new Subject<ChessMove>();
    private pawnNeedsPromotionSource = new Subject<Color>();
    private gameMessageSource = new Subject<string>();
    private gameEndedSource = new Subject();
    private inCheckSource = new Subject<number>();
    private gameStartedSource = new Subject<Color>(); // sends out player color when the game starts

    inCheck$ = this.inCheckSource.asObservable();
    pawnNeedsPromotion$ = this.pawnNeedsPromotionSource.asObservable();
    playerMovedPiece$ = this.playerMovedPieceSource.asObservable();
    opponentMovedPiece$ = this.opponentMovedPieceSource.asObservable();
    gameMessage$ = this.gameMessageSource.asObservable();
    gameStarted$ = this.gameStartedSource.asObservable();
    gameEnded$ = this.gameEndedSource.asObservable();

    private playerColor: Color;
    private opponentColorStr: string;
    chessboard: Chessboard;

    constructor() {
    }

    getChessboardArray(): ChessPiece[] {
        return this.chessboard.getBoardArray();
    }

    getChessboard() {
        return this.chessboard;
    }

    getPlayerColor(): Color {
        return this.playerColor;
    }

    getValidMovesForPieceAt(boardLocation: number) {
        if (this.isPlayersTurn()) {
            return this.chessboard.getValidMovesForPieceAt(boardLocation);
        } else return [];
    }

    isValidMove(from: number, to: number) {
        if (this.isPlayersTurn()) return this.chessboard.isValidMove(from, to);
        else return false;
    }

    ngOnDestroy() { }

    validatePlayersMove(chessMove: ChessMove) {
        if (this.isPlayersTurn() && this.chessboard.isLegalMove(chessMove)) {
            this.chessboard.movePiece(chessMove);
            if (this.chessboard.needsPawnPromotion(chessMove)) {
                this.pawnNeedsPromotionSource.next(this.playerColor);
            } else {
                this.checkGameStatus();
                this.playerMovedPieceSource.next(chessMove);
            }
        }
    }

    promotePawn(chessPiece: ChessPiece) {
        this.chessboard.promotePawn(chessPiece);
        this.checkGameStatus();
        this.playerMovedPieceSource.next(this.chessboard.getLastMove());
    }

    applyOpponentsMove(chessMove: ChessMove) {
        if (this.chessboard.isLegalMove(chessMove)) {
            this.chessboard.applyMove(chessMove);
            this.checkGameStatus();
            this.opponentMovedPieceSource.next(chessMove);
        } else this.opponentMadeIllegalMove();
    }

    opponentMadeIllegalMove() {
        console.log("opponent made illegal move");
    }

    isPlayersTurn() {
        return this.chessboard.getTurn() == this.playerColor;
    }

    startGame(color: Color) {
        this.chessboard = new Chessboard();
        this.playerColor = color;
        this.gameStartedSource.next(color);
        this.opponentColorStr = color == Color.BLACK ? "White" : "Black";
    }

    checkGameStatus() {
        let turn = this.chessboard.getTurn();
        if (this.chessboard.isInCheck(turn)) {
            this.inCheckSource.next(this.chessboard.getKingLocation(turn));
            if (this.chessboard.isCheckmate()) {
                let outcome = this.isPlayersTurn() ? "You lost." : "You win!";
                this.endGame("Checkmate! " + outcome);
            }
        }
        else {
            this.inCheckSource.next(null);
            if (this.chessboard.isStalemate()) this.endGame("Stalemate. Tie game.");
        }
    }

    endGame(message: string) {
        this.gameMessageSource.next(message);
        this.gameEndedSource.next();
        this.playerColor = null;
    }

    opponentQuit(opponentStatus: PlayerStatus) {
        if (opponentStatus == PlayerStatus.RESIGNED) this.endGame("Opponent Resigned. You win!");
        else this.endGame("Opponent disconnected. You win by default.");
    }
}


