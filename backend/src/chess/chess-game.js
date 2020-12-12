const GameUpdate = require('./shared/game-update'),
    Player = require('./player'),
    Color = require('./shared/color'),
    PlayerStatus = require('./shared/player-status'),
    GameStatus = require('./shared/game-status'),
    util = require('../shared/util');

module.exports = class ChessGame {

    constructor(settings) {
        this.settings = settings;
        this.password = settings.password;
        this.gameID = settings.gameID;
        this.settings.password = ""; //settings is used for the lobby and passwords needs to be cleared
        this.waitingPlayerConnection;
        this.lastChessMove = null;
        this.status = GameStatus.UNLISTED;

        let hostColor = this.settings.playerColor;
        if (hostColor === Color.RANDOM) {
            hostColor = this.randomColor();
        } 
        this.host = new Player(hostColor, util.newRandomString(false, 15), PlayerStatus.ACTIVE);
        this.settings.playerColor = this.opponentColor(settings.playerColor);
        this.guest = new Player(this.opponentColor(hostColor), util.newRandomString(false, 15), null);
    }

    opponentColor(color) {
        if (color === Color.RANDOM) return Color.RANDOM;
        return color === Color.WHITE ? Color.BLACK : Color.WHITE;
    }

    randomColor() {
        return this.flipCoin() ? Color.WHITE : Color.BLACK;
    }

    updatePlayerStatus(gameUpdate, response) {
        if (gameUpdate.playerID == this.host.ID) {
            this.host.setStatus(gameUpdate.playerStatus);
            response.status(200).send(this.getGameUpdateFor(this.host));
        }
        else if (gameUpdate.playerID == this.guest.ID) {
            this.guest.setStatus(gameUpdate.playerStatus);
            response.status(200).send(this.getGameUpdateFor(this.guest));
        } else response.status(403).send("Invalid Request");
    }

    joinGame(password, response) {
        if (this.canJoin()) {
            if (this.password === password) {
                response.status(200).send(this.addPlayer());
            } else response.status(401).send("Wrong Password");
        } else response.status(403).send("Invalid Request");
    }

    canJoin() {
        this.updateGameStatus();
        return this.status == GameStatus.IN_LOBBY;
    }

    updateGameStatus() {
        this.host.updateConnectionStatus();
        if (this.guest.status) {
            this.guest.updateConnectionStatus();
            this.status = (this.guest.status == PlayerStatus.ACTIVE) && (this.host.status == PlayerStatus.ACTIVE) ?
                GameStatus.ACTIVE : GameStatus.OVER;
        } else {
            this.status = this.host.status == PlayerStatus.ACTIVE ? this.status : GameStatus.OVER;
        }
    }

    canBeListed() {
        return this.status == GameStatus.UNLISTED;
    }

    prepareForLobby(response) {
        this.status = GameStatus.IN_LOBBY;
        this.waitingPlayerConnection = response;
    }

    addPlayer() {
        this.status = GameStatus.ACTIVE;
        this.guest.setStatus(PlayerStatus.ACTIVE);
        let gameUpdate = this.getGameUpdateFor(this.guest);
        this.waitingPlayerConnection.status(200).send(this.getGameUpdateFor(this.host));
        return gameUpdate;
    }

    isExpired() {
        this.updateGameStatus();
        if (this.status == GameStatus.IN_LOBBY) return this.host.hasDisconnected();
        else return (this.host.hasDisconnected() && this.guest.hasDisconnected());
    }

    changeTurn() {
        this.host.toggleTurn();
        this.guest.toggleTurn();
    }

    flipCoin() {
        return (Math.floor(Math.random() * 2) == 0);
    }

    getGameUpdateFor(player) {
        this.updateGameStatus();
        let opponent = this.host.ID == player.ID ? this.guest : this.host;
        let gameUpdate = new GameUpdate(
            this.lastChessMove,
            this.gameID,
            player.ID,
            player.color,
            this.status,
            opponent.status);
        return gameUpdate;
    }

    newChessMove(gameUpdate, response) {
        let player = gameUpdate.playerID == this.host.ID ? this.host : this.guest;
        if (player.ID != gameUpdate.playerID) {
            response.status(403).send("Invalid Request");
        } else if (player.isTurn()) {
            let opponent = player.ID == this.host.ID ? this.guest : this.host;
            this.lastChessMove = gameUpdate.chessMove;
            this.waitingPlayerConnection.status(200).send(this.getGameUpdateFor(opponent));
            this.waitingPlayerConnection = response;
            this.changeTurn();
        } else {
            this.waitingPlayerConnection = response;
        }
    }

    isPlayersTurn(playerID) {
        return this.turn.ID == playerID;
    }

    static getTimedOutResponse() {
        return { serverMessage: "TIMED_OUT" };
    }

}