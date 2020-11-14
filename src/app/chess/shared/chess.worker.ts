/// <reference lib="webworker" />

import { ChessMove } from './models/chess-move.model';
import { Chessboard } from './models/chessboard.model';
var moveCount: number = 0;
var transmutationTable = new Map();

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  let chessboard = new Chessboard(data);
  let move = getComputersMove(3, chessboard);
  postMessage(move);
});

function getComputersMove(depth: number, chessboard: Chessboard) {
  transmutationTable = new Map();
  moveCount = 0;
  console.log("transmutation Table starting size: " + transmutationTable.size);

  let chessMoves = chessboard.getAllMoves();
  for (let chessMove of chessMoves) {
    chessboard.applyMove(chessMove);
    chessMove.value = alphaBetaMin(depth, chessboard, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    chessboard.undoMove(chessMove);
  }
  chessMoves.sort(function (a, b) {

    if (a.value < b.value) {
      return 1;
    }
    if (a.value > b.value) {
      return -1;
    }
    return 0;
  });
  for (let chessMove of chessMoves) {
    console.log(chessMove);
  }
  console.log("board positions evaluated: " + transmutationTable.size);
  return getBestMove(chessMoves);
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

function alphaBetaMax(depth: number, chessboard, alpha: number, beta: number) {
  if (depth == 0) {
    return chessboard.evaluate();
  }
  let moves = chessboard.getAllMoves();
  let value = Number.MIN_SAFE_INTEGER;
  for (let chessMove of moves) {
    moveCount++;
    chessboard.applyMove(chessMove);
    let fen = chessboard.getBoardString();
    if (transmutationTable.has(fen)) {
      value = Math.max(transmutationTable.get(fen));
    }
    else {
      value = Math.max(value, alphaBetaMin(depth - 1, chessboard, alpha, beta));
      transmutationTable.set(fen, value);
    }
    chessboard.undoMove(chessMove);
    alpha = Math.max(alpha, value);
    if (alpha >= beta) break;

  }
  return value
}

function alphaBetaMin(depth, chessboard, alpha, beta) {
  if (depth == 0) {
    return -chessboard.evaluate();
  }
  let moves = chessboard.getAllMoves();
  let value = Number.MAX_SAFE_INTEGER;

  for (let chessMove of moves) {
    chessboard.applyMove(chessMove);
    let fen = chessboard.getBoardString();
    if (transmutationTable.has(fen)) {
      value = Math.min(value,transmutationTable.get(fen));
    }
    else {
      value = Math.min(value, alphaBetaMax(depth - 1, chessboard, alpha, beta));
      transmutationTable.set(fen, value);
    }
    chessboard.undoMove(chessMove);
    beta = Math.min(beta, value);
    if (beta <= alpha) break;
  }
  return value;
}
