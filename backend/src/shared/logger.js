const { write } = require('fs');
const fs = require('fs');

function logError(error) {
    fs.appendFile("log.txt", error, (error) => {
        if(error) console.log("An error occuried while trying to log error.");
        console.log("An error was recorded in log.txt");
    });

}

module.exports = {
    logError: logError,
}