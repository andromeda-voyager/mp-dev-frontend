const Color = require('./shared/color'),
    PlayerStatus = require('./shared/player-status');

const TIME_OUT = 18000;

module.exports = class Player {
    constructor(color, ID, status) {
        this.ID = ID;
        this.color = color;
        this.status = status;
        this.lastUpdate = new Date().getTime();
        this.turn = this.color == Color.WHITE ? true : false;
    }

    setStatus(status) {
        this.status = status;
        this.lastUpdate = new Date().getTime();
    }

    toggleTurn() {
        this.turn = !this.turn;
    }

    isTurn() {
        return this.turn;
    }

    updateConnectionStatus() {
        this.status = this.getTimeSinceUpdate(this.lastUpdate) < TIME_OUT ? this.status : PlayerStatus.DISCONNECTED;
    }

    hasResigned() {
        return this.status == PlayerStatus.RESIGNED;
    }

    hasDisconnected() {
        return this.status == PlayerStatus.DISCONNECTED;
    }

    getTimeSinceUpdate(updateTime) {
        return new Date().getTime() - updateTime;
    }

}