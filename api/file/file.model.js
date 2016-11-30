/**
 * Created by zhengguorong on 2016/11/30.
 */
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

var FileSchema = new mongoose.Schema({
    filePath: {
        type: String,
        required: true
    },
    fileName: String,
    createDate: { type: Date, default: Date.now },
    themeId: {
        type: String
    }
})

module.exports = mongoose.model('File', FileSchema)