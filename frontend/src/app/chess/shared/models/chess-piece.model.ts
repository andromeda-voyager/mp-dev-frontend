import { Color } from './color';

export interface ChessPiece {
    readonly pieceType: PieceType;
    readonly imageUrl: string;
    readonly color: Color;
    readonly fenChar: FenChar;
}

export enum PieceType {
    EMPTY = 0,
    ROOK = 5,
    PAWN = 1,
    BISHOP = 4,
    KNIGHT = 3,
    KING = 9,
    QUEEN = 8,
}

export enum FenChar {
    WHITE_ROOK = 'R',
    WHITE_PAWN = 'P',
    WHITE_BISHOP = 'B',
    WHITE_KNIGHT = 'N',
    WHITE_KING = 'K',
    WHITE_QUEEN = 'Q',
    EMPTY = '0',
    BLACK_ROOK = 'r',
    BLACK_PAWN = 'p',
    BLACK_BISHOP = 'b',
    BLACK_KNIGHT = 'n',
    BLACK_KING = 'k',
    BLACK_QUEEN = 'q',
}
