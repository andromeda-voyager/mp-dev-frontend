/// <reference lib="webworker" />

import { ChessMove } from './models/chess-move.model';
import { Chessboard } from './models/chessboard.model';
var moveCount: number = 0;
var transmutationTable = new Map();

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  let chessboard = new Chessboard(data);
  let move = getComputersMove(4, chessboard);
  postMessage(move);
});

function getComputersMove(depth: number, chessboard: Chessboard) {
  transmutationTable = new Map();
  moveCount = 0;
  let moves = chessboard.getAllMoves();
  for (let chessMove of moves) {
    chessboard.applyMove(chessMove);
    chessMove.value = alphaBetaMin(depth, chessboard, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    chessboard.undoMove(chessMove);
  }
  moves.sort(function (a, b) {

    if (a.value < b.value) {
      return 1;
    }
    if (a.value > b.value) {
      return -1;
    }
    return 0;
  });

  return getBestMove(moves);
}

function getBestMove(chessMoves: ChessMove[]) {
  if (chessMoves.length > 0) {
    for (let i = 1; i < chessMoves.length; i++) {
      if (chessMoves[i].value != chessMoves[i - 1].value) {
        return chessMoves.slice(0, i)[Math.floor(Math.random() * i)]; // returns a random move from the best moves
      }
    }
    return chessMoves[0]; //array only has one chess move
  }
  else return null; // array has no moves (stalemate or checkmate)
}

function alphaBetaMax(depth, chessboard, alpha, beta) {
  if (depth == 0) {
    return chessboard.evaluate();
  }
  let moves = chessboard.getAllMoves();
  for (let chessMove of moves) {
    moveCount++;
    let value: number;
    chessboard.applyMove(chessMove);
    let hash = chessboard.getBoardString();
    if (transmutationTable.has(hash)) {
      value = transmutationTable.get(hash);
    }
    else {
      value = alphaBetaMin(depth - 1, chessboard, alpha, beta);
      transmutationTable.set(hash, value);
    }
    chessboard.undoMove(chessMove);

    if (value >= beta) return beta;
    if (value > alpha) alpha = value;
  }
  return alpha;
}

function alphaBetaMin(depth, chessboard, alpha, beta) {
  if (depth == 0) {
    return -chessboard.evaluate();
  }
  let moves = chessboard.getAllMoves();

  for (let chessMove of moves) {
    let value: number;
    chessboard.applyMove(chessMove);
    let hash = chessboard.getBoardString();
    if (transmutationTable.has(hash)) {
      value = transmutationTable.get(hash);
    }
    else {
      value = alphaBetaMax(depth - 1, chessboard, alpha, beta);
      transmutationTable.set(hash, value);
    }
    chessboard.undoMove(chessMove);

    if (value <= alpha) return alpha;
    if (value < beta) beta = value;
  }
  return beta;
}
