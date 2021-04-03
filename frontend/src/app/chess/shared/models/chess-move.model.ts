import { ChessPiece } from './chess-piece.model';

export enum Flag { NONE="NONE", CHECKMATE = "CHECKMATE", CHECK= "CHECK", STALEMATE = "STALEMATE"}
export enum PROMOTION { QUEEN = "QUEEN", ROOK = "ROOK", BISHOP = "BISHOP", KNIGHT="KNIGHT" }

export interface ChessMove {
    readonly to: number;
    readonly from: number;
    isCastle?: boolean;
    isEnPassant?: boolean;
    promotion?: ChessPiece;
    value?:number;  
}
