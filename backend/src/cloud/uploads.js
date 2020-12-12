const fs = require('fs'),
    util = require('../shared/util'),
    path = require('path'),
    uploadFolderLocation = path.join(__dirname,"../../public/"),
    auth = require ('./auth')
    IMAGE_KEPT_TIME = 300000;

var uploadFolder;
var images = {};

function createUploadFolder() {
    let folders = fs.readdirSync(uploadFolderLocation, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory());
    if (folders.length > 0) {
        uploadFolder = folders[0].name
    } else {
        uploadFolder = util.newRandomString(true, 8);
        fs.mkdirSync(uploadFolderLocation + uploadFolder);
    }
}

function uploadImage(json) {
    if (auth.isAuthorized(json.Signature, json.Message)) {
        let imageFileName = json.Message + ".jpg";
        var imgStr = json.Image.replace(/^data:image\/\w+;base64,/, "");
        var buffer = Buffer.from(imgStr, 'base64');
        fs.writeFileSync(uploadFolderLocation + uploadFolder + "/" + imageFileName, buffer);
        images[imageFileName] = {};
        images[imageFileName].timeCreated = new Date().getTime();
        return uploadFolder + "/" + imageFileName;
    }
    return "failed";
}

function isImageExpired(img) {
    timeNow = new Date().getTime()
    if (images[img]) {
        return timeNow - images[img].timeCreated > IMAGE_KEPT_TIME
    }
    return true
}

function removeExpiredFiles() {
    fs.readdir(uploadFolderLocation + uploadFolder, (err, files) => {
        if (err != null) {
            console.log(err.name + "   " + err.message)
        }
        else {
            files.forEach(file => {
                if (isImageExpired(file)) {
                    fs.unlink(uploadFolderLocation + uploadFolder + "/" + file, (err) => {
                        if (err != null) console.log(err.name + "   " + err.message)
                    })
                }
            })
        }
    })
}

module.exports =
{
    uploadImage,
    removeExpiredFiles,
    createUploadFolder
};

