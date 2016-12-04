var Pages = require('../api/pages/pages.model')
var pageController = require('../controller/pages.controller')
var template = require('art-template')
var error = require('./error')

const render = (req, res) => {
    const id = req.query.id
    if (id) {
        pageController.findById(id)
        .then(function (entity) {
            let html = template('template', entity);
            res.send(html)
        })
        .catch ((err) => {
            error(req, res, {message: '找不到数据', error: err})
        })
    }else {
        error(req, res, {message: '请加入查询ID', error: {}})
    }

}
module.exports = render