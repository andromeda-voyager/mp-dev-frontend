const express = require('express'),
   server = express(),
   cors = require('cors');

// server.set('port', process.env.PORT || 3000);
server.use(cors());
server.use(express.json());
server.use(express.static('./public'));
server.use('/api/chess', require('./src/chess/routes'));
server.use('/api/books', require('./src/books/routes'));
server.use('/api/cloud', require('./src/cloud/routes'));
server.use('/api/sms', require('./src/sms/routes'));

//Express error handling middleware
server.use((request, response) => {
   response.type('text/plain');
   response.status(505);
   response.send('Error');
});

//Binding to a port
server.listen(3000, () => {
   console.log('Express server started at port 3000');
});