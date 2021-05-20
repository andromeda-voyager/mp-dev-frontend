import { Component, OnInit, Input } from '@angular/core';
import { Color } from '../shared/models/color';
import { ChessPiece } from '../shared/models/chess-piece.model';
import { ChessboardService } from '../shared/chessboard.service';
import { BLACK_BISHOP, BLACK_KNIGHT, BLACK_QUEEN, BLACK_ROOK, WHITE_BISHOP, WHITE_KNIGHT, WHITE_QUEEN, WHITE_ROOK } from '../shared/models/chess-pieces';

@Component({
  selector: 'app-pawn-promotion',
  templateUrl: './pawn-promotion.component.html',
  styleUrls: ['./pawn-promotion.component.css']
})

export class PawnPromotionComponent implements OnInit {

  isHidden: boolean = true;
  @Input() color: Color = Color.NONE;
  promotionOptions: ChessPiece[] = [];

  constructor(private chessboardService: ChessboardService) {
    chessboardService.pawnNeedsPromotion$.subscribe(
      color => {
        if (color === this.color) this.isHidden = false;
      });
  }

  ngOnInit(): void {
    this.promotionOptions = Color.BLACK == this.color ?
      [BLACK_QUEEN, BLACK_ROOK, BLACK_BISHOP, BLACK_KNIGHT] :
      [WHITE_QUEEN, WHITE_ROOK, WHITE_BISHOP, WHITE_KNIGHT];
  }

  promotePawn(chessPiece: ChessPiece) {
    this.chessboardService.promotePawn(chessPiece);
    this.isHidden = true;
  }


}
