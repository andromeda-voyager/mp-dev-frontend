import { FenChar, PieceType } from './chess-piece.model';
import { Color } from './color';

export const WHITE_PAWN = { pieceType: PieceType.PAWN, imageUrl:"assets/chess-pieces/white_pawn.svg", color: Color.WHITE, fenChar: FenChar.WHITE_PAWN };
export const WHITE_ROOK = { pieceType: PieceType.ROOK, imageUrl:"assets/chess-pieces/white_rook.svg", color: Color.WHITE, fenChar: FenChar.WHITE_ROOK };
export const WHITE_KNIGHT = { pieceType: PieceType.KNIGHT, imageUrl:"assets/chess-pieces/white_knight.svg", color: Color.WHITE, fenChar: FenChar.WHITE_KNIGHT };
export const WHITE_BISHOP = { pieceType: PieceType.BISHOP, imageUrl:"assets/chess-pieces/white_bishop.svg", color: Color.WHITE, fenChar: FenChar.WHITE_BISHOP};
export const WHITE_KING= { pieceType: PieceType.KING, imageUrl:"assets/chess-pieces/white_king.svg", color: Color.WHITE, fenChar: FenChar.WHITE_KING };
export const WHITE_QUEEN = { pieceType: PieceType.QUEEN, imageUrl:"assets/chess-pieces/white_queen.svg", color: Color.WHITE, fenChar: FenChar.WHITE_QUEEN };

export const BLACK_PAWN = { pieceType: PieceType.PAWN, imageUrl:"assets/chess-pieces/black_pawn.svg", color: Color.BLACK, fenChar: FenChar.BLACK_PAWN };
export const BLACK_ROOK = { pieceType: PieceType.ROOK, imageUrl:"assets/chess-pieces/black_rook.svg", color: Color.BLACK, fenChar: FenChar.BLACK_ROOK };
export const BLACK_KNIGHT = { pieceType: PieceType.KNIGHT, imageUrl:"assets/chess-pieces/black_knight.svg", color: Color.BLACK , fenChar: FenChar.BLACK_KNIGHT};
export const BLACK_BISHOP = { pieceType:  PieceType.BISHOP, imageUrl:"assets/chess-pieces/black_bishop.svg", color: Color.BLACK, fenChar: FenChar.BLACK_BISHOP };
export const BLACK_KING = { pieceType: PieceType.KING, imageUrl:"assets/chess-pieces/black_king.svg", color: Color.BLACK, fenChar: FenChar.BLACK_KING };
export const BLACK_QUEEN = { pieceType: PieceType.QUEEN, imageUrl:"assets/chess-pieces/black_queen.svg", color: Color.BLACK, fenChar: FenChar.BLACK_QUEEN };

export const EMPTY_SQUARE = { pieceType: PieceType.EMPTY, imageUrl: null, color: Color.EMPTY, fenChar: FenChar.EMPTY};
