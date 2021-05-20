import { ChessPiece } from './chess-piece.model';

export enum Flag { NONE="NONE", CHECKMATE = "CHECKMATE", CHECK= "CHECK", STALEMATE = "STALEMATE"}
export enum PROMOTION { QUEEN = "QUEEN", ROOK = "ROOK", BISHOP = "BISHOP", KNIGHT="KNIGHT", NONE="NONE" }

export class ChessMove {
    readonly to: number;
    readonly from: number;
    isCastle: boolean = false;
    isEnPassant: boolean = false;
    promotion?: ChessPiece;
    value:number = 0;  

    constructor(from: number, to:number) {
        this.to = to;
        this.from = from;
    }

}
