const crypto = require("crypto"),
    fs = require('fs'),
    path = require('path'),
    keyLocation = path.join(__dirname,"../../keys/uploadKey.pub");
    
function isAuthorized(signature, message) {
    var publicKey = fs.readFileSync(keyLocation, "utf8");
    const verifier = crypto.createVerify("RSA-SHA256")
    verifier.update(message);
    const signatureBuf = Buffer.from(signature, 'base64');
    return verifier.verify(publicKey, signatureBuf);
}

module.exports =
{
    isAuthorized,
};
