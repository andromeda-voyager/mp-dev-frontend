import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, CdkDragStart } from '@angular/cdk/drag-drop';
import { ChessMove } from 'src/app/chess/shared/models/chess-move.model'
import { ChessPiece } from '../shared/models/chess-piece.model';
import { ChessboardService } from '../shared/chessboard.service';
import { Color } from '../shared/models/color';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})

export class ChessboardComponent implements OnInit {
  chessboardSpine: number[][] = [];
  moveFromIndex: number;
  moveToIndex: number;
  validMoveHoverIndex: number;
  chessboard: ChessPiece[];
  dragFrom: number;
  selectedPiece: number;
  lastMove: ChessMove;
  validMoves = new Set<number>();
  inCheckLocation: number;
  playerColor: Color;
  Color = Color;
  readonly numColumns = 8;

  changeHighlightedSquares(chessMove: ChessMove) {
    this.moveFromIndex = chessMove.from;
    this.moveToIndex = chessMove.to;
  }

  isHighlighted(index: number): boolean {
    return (this.moveToIndex === index ||
      this.moveFromIndex === index ||
      this.selectedPiece === index ||
      this.validMoveHoverIndex === index)
  }

  constructor(private chessboardService: ChessboardService) {
    for (var i = 0; i < 8; i++) {
      this.chessboardSpine[i] = [];
      for (var j = 0; j < 8; j++) {
        this.chessboardSpine[i][j] = i * 8 + j;
      }
    }
    this.chessboard = this.chessboardService.getChessboardArray();
    this.playerColor = this.chessboardService.getPlayerColor();

  }

  drop(event: CdkDragDrop<ChessPiece>, boardLocation: number) {
    this.validMoves.clear();
    this.selectedPiece = null;
    this.validMoveHoverIndex = null;

    if (event.previousContainer === event.container) {

    } else {
      let dragTo = boardLocation;
      this.chessboardService.validatePlayersMove({ from: this.dragFrom, to: dragTo });
    }
  }

  drag(event: CdkDragDrop<ChessPiece>, boardLocation: number) {
    this.dragFrom = boardLocation;
  }

  hover(event: CdkDragEnter<ChessPiece>, dragTo: number) {
    if (this.chessboardService.isValidMove(this.dragFrom, dragTo)) this.validMoveHoverIndex = dragTo;
    else this.validMoveHoverIndex = null;
  }

  showValidMoves(boardLocation: number) {
    this.validMoves.clear();
    let moves = this.chessboardService.getValidMovesForPieceAt(boardLocation);
    for (const move of moves) {
      this.validMoves.add(move.to);
    }
  }

  pieceDragStarted(event: CdkDragStart<ChessPiece>, boardLocation: number) {
    this.dragFrom = boardLocation;
    this.selectedPiece = boardLocation;
    this.showValidMoves(boardLocation);
  }

  ngOnInit(): void {
    this.chessboardService.playerMovedPiece$.subscribe(
      chessMove => {
        this.changeHighlightedSquares(chessMove);
      });

    this.chessboardService.opponentMovedPiece$.subscribe(
      chessMove => {
        this.changeHighlightedSquares(chessMove);
      });

    this.chessboardService.inCheck$.subscribe(
      location => {
        this.inCheckLocation = location;
      });
  }

}
