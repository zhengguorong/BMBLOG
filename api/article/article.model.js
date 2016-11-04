/**
 * Created by zhengguorong on 16/11/4.
 */
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

var ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    html: String,
    createDate: { type: Date, default: Date.now },
    author: String,
    tags: Array
})

module.exports = mongoose.model('Article', ArticleSchema)