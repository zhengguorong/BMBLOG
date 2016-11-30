/**
 * Created by zhengguorong on 2016/11/30.
 */
var fs = require('fs');
var mkdirp = require('mkdirp');

const base64ToImg = (imgData, filePath) => {
    console.log(filePath)
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "")
    var dataBuffer = new Buffer(base64Data, 'base64')
    var fileDir = filePath.substring(0, filePath.lastIndexOf('/'))
    console.log(fileDir)
    mkdirp(fileDir, (err) => {
        fs.writeFile(filePath, dataBuffer, (err) => {
        })
    })
}

module.exports = {
    base64ToImg
}