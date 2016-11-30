/**
 * Created by zhengguorong on 16/11/4.
 */
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

var PageSchema = new mongoose.Schema({
    pages: {
        type: Array,
        required: true
    },
    html: String,
    createDate: { type: Number, default: new Date().getTime() },
    loginId: String,
})

module.exports = mongoose.model('Page', PageSchema)