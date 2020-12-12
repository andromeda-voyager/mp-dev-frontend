const charSetFull = "0123456789abcdefghijklmnopqrzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+=-";
const charSetAlpha = "abcdefghijklmnopqrzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function newRandomString(isAlphabetOnly, length) {
    let randString = "";
    charSet = isAlphabetOnly ? charSetAlpha: charSetFull;
    while (randString.length < length) {
        randString += charSet[Math.floor(Math.random() * charSet.length)];
    }
    return randString;
}

module.exports =
{
    newRandomString,
};