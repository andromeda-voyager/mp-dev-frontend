module.exports =  class GameUpdate {
    constructor(chessMove, gameID, playerID, playerColor, gameStatus, opponentStatus) {
        this.chessMove = chessMove;
        this.gameID = gameID;
        this.playerID = playerID;
        this.playerColor = playerColor;
        this.gameStatus = gameStatus;
        this.opponentStatus = opponentStatus;
    }
}