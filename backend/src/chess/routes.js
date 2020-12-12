const router = require('express').Router(),
    GamesManager = require('./games-manager');

router.post('/player-status', async (request, response) => {
    try {
      GamesManager.updatePlayerStatus(request.body, response);
    } catch (error) {
       console.log(error);
       response.status(400).send('An error occured on the server. /update-player-status');
    }
 });
 
 router.post('/move', async (request, response) => {
    try {
      GamesManager.newChessMove(request.body, response);
    } catch (error) {
       console.log(error);
       response.status(400).send('An error occured on the server. /chess-move');
    }
 });
 
 router.get('/lobby-games', async (request, response) => {
    try {
       response.status(200).send(GamesManager.getLobbyGames());
    } catch (error) {
       console.log(error);
       response.status(400).send('An error occured on the server. /get-lobby-games');
    }
 });
 
 router.post('/game', async (request, response) => {
    try {
       response.status(200).send(GamesManager.createChessGame(request.body));
    } catch (error) {
       console.log(error);
       response.status(400).send('An error occured on the server. /create-chess-game');
    }
 });
 
 router.post('/list-game', async (request, response) => {
    try {
      GamesManager.listChessGame(request.body, response);
    } catch (error) {
       console.log(error);
       response.status(400).send('An error occured on the server. /list-chess-game');
    }
 });
 
 router.post('/join-game', async (request, response) => {
    try {
      GamesManager.joinChessGame(request.body, response);
    } catch (error) {
       console.log(error);
       response.status(400).send('An error occured on the server. /join-chess-game');
    }
 });

 module.exports = router;