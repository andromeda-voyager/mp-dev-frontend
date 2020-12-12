const crypto = require("crypto"),
    fs = require('fs');


function isAuthorized(signature, message) {
    var publicKey = fs.readFileSync("../keys/serverKey.pub", "utf8");
    const verifier = crypto.createVerify("RSA-SHA256")
    verifier.update(message);
    const signatureBuf = Buffer.from(signature, 'base64');
    return verifier.verify(publicKey, signatureBuf);
}

module.exports =
{
    isAuthorized,
};
