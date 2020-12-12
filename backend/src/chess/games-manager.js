const ChessGame = require('./chess-game'),
    util = require('../shared/util');

var chessGames = new Map();
setInterval(() => {
    cleanUpExpiredGames();
}, 10000); // 10 seconds

function createChessGame(gameSettings) {
    gameSettings.gameID = util.newRandomString(false, 15);
    while (chessGames.has(gameSettings.gameID)) {
        gameSettings.gameID = util.newRandomString(false, 15);
    }
    let chessGame = new ChessGame(gameSettings);
    chessGames.set(chessGame.gameID, chessGame);
    return chessGame.getGameUpdateFor(chessGame.host);
}

function listChessGame(gameUpdate, response) {
    if (chessGames.has(gameUpdate.gameID)) {
        let chessGame = chessGames.get(gameUpdate.gameID);
        if (chessGame.canBeListed()) {
            chessGame.prepareForLobby(response);
        } else response.status(400).send("Invalid Request");
    } else response.status(404).send("Game not found.")
}

function newChessMove(gameUpdate, response) {
    if (chessGames.has(gameUpdate.gameID)) {
        chessGames.get(gameUpdate.gameID).newChessMove(gameUpdate, response);
    } else {
        response.status(404).send("Game not found");
    }
}

function updatePlayerStatus(gameUpdate, response) {
    if (chessGames.has(gameUpdate.gameID)) {
        return chessGames.get(gameUpdate.gameID).updatePlayerStatus(gameUpdate, response);
    } else response.status(404).send("Game not found");
}

function getLobbyGames() {
    let lobbyGames = [];
    chessGames.forEach(chessGame => {
        if (chessGame.canJoin()) lobbyGames.push(chessGame.settings);
    });
    return lobbyGames;
}

function joinChessGame(gameSettings, response) {
    if (chessGames.has(gameSettings.gameID)) {
        let chessGame = chessGames.get(gameSettings.gameID);
        chessGame.joinGame(gameSettings.password, response);
    } else {
        response.status(404).send("Game not Found");
    }
}

function cleanUpExpiredGames() {
    let expiredGames = [];
    chessGames.forEach(chessGame => {
        if (chessGame.isExpired()) {
            expiredGames.push(chessGame);
        }
    });
    for (const chessGame of expiredGames) {
        chessGames.delete(chessGame.gameID);
    }
}

module.exports = {
    createChessGame,
    listChessGame,
    newChessMove,
    updatePlayerStatus,
    updatePlayerStatus,
    getLobbyGames,
    joinChessGame
}