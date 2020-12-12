import * as ChessPieces from '../../shared/models/chess-pieces';
import { ChessPiece } from './chess-piece.model';

export const CHESSBOARD: ChessPiece[] =
    [ChessPieces.BLACK_ROOK, ChessPieces.BLACK_KNIGHT, ChessPieces.BLACK_BISHOP, ChessPieces.BLACK_QUEEN, ChessPieces.BLACK_KING, ChessPieces.BLACK_BISHOP, ChessPieces.BLACK_KNIGHT, ChessPieces.BLACK_ROOK,
    ChessPieces.BLACK_PAWN, ChessPieces.BLACK_PAWN, ChessPieces.BLACK_PAWN, ChessPieces.BLACK_PAWN, ChessPieces.BLACK_PAWN, ChessPieces.BLACK_PAWN, ChessPieces.BLACK_PAWN, ChessPieces.BLACK_PAWN,
    ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE,
    ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE,
    ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE,ChessPieces.EMPTY_SQUARE,
    ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE,ChessPieces.EMPTY_SQUARE,
    ChessPieces.WHITE_PAWN, ChessPieces.WHITE_PAWN, ChessPieces.WHITE_PAWN, ChessPieces.WHITE_PAWN, ChessPieces.WHITE_PAWN, ChessPieces.WHITE_PAWN, ChessPieces.WHITE_PAWN, ChessPieces.WHITE_PAWN,
    ChessPieces.WHITE_ROOK, ChessPieces.WHITE_KNIGHT, ChessPieces.WHITE_BISHOP, ChessPieces.WHITE_QUEEN, ChessPieces.WHITE_KING, ChessPieces.WHITE_BISHOP, ChessPieces.WHITE_KNIGHT, ChessPieces.WHITE_ROOK];

export const CHESSBOARD_TESTING: ChessPiece[] =
    [ChessPieces.BLACK_ROOK, ChessPieces.BLACK_KNIGHT, ChessPieces.BLACK_BISHOP, ChessPieces.BLACK_QUEEN, ChessPieces.BLACK_KING, ChessPieces.BLACK_BISHOP, ChessPieces.BLACK_KNIGHT, ChessPieces.BLACK_ROOK,
    ChessPieces.BLACK_PAWN, ChessPieces.BLACK_PAWN, ChessPieces.BLACK_PAWN, ChessPieces.BLACK_PAWN, ChessPieces.BLACK_PAWN, ChessPieces.BLACK_PAWN, ChessPieces.BLACK_PAWN, ChessPieces.BLACK_PAWN,
    ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE,
    ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE,
    ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE,ChessPieces.EMPTY_SQUARE,
    ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE,ChessPieces.EMPTY_SQUARE,
    ChessPieces.WHITE_PAWN, ChessPieces.WHITE_PAWN, ChessPieces.WHITE_PAWN, ChessPieces.WHITE_PAWN, ChessPieces.WHITE_PAWN, ChessPieces.WHITE_PAWN, ChessPieces.WHITE_PAWN, ChessPieces.WHITE_PAWN,
    ChessPieces.WHITE_ROOK, ChessPieces.WHITE_KNIGHT, ChessPieces.WHITE_BISHOP, ChessPieces.WHITE_QUEEN, ChessPieces.WHITE_KING, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.WHITE_ROOK];


// export const CHESSBOARD_TESTING: ChessPiece[] =
//     [ChessPieces.BLACK_ROOK, ChessPieces.BLACK_KNIGHT, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.BLACK_BISHOP, ChessPieces.BLACK_KNIGHT, ChessPieces.EMPTY_SQUARE,
//     ChessPieces.EMPTY_SQUARE, ChessPieces.BLACK_BISHOP, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.BLACK_PAWN, ChessPieces.EMPTY_SQUARE, ChessPieces.BLACK_PAWN, ChessPieces.EMPTY_SQUARE,
//     ChessPieces.BLACK_KNIGHT, ChessPieces.BLACK_PAWN, ChessPieces.BLACK_PAWN, ChessPieces.EMPTY_SQUARE, ChessPieces.WHITE_PAWN, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE,
//     ChessPieces.BLACK_PAWN, ChessPieces.EMPTY_SQUARE, ChessPieces.BLACK_KING, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.WHITE_QUEEN, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE,
//     ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE,ChessPieces.EMPTY_SQUARE,
//     ChessPieces.EMPTY_SQUARE, ChessPieces.WHITE_BISHOP, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.WHITE_PAWN, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE,ChessPieces.BLACK_ROOK,
//     ChessPieces.WHITE_PAWN, ChessPieces.BLACK_PAWN, ChessPieces.WHITE_PAWN, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.WHITE_PAWN,
//     ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.EMPTY_SQUARE, ChessPieces.WHITE_ROOK, ChessPieces.WHITE_ROOK, ChessPieces.EMPTY_SQUARE, ChessPieces.WHITE_KING, ChessPieces.EMPTY_SQUARE];



