var Pages = require('../api/pages/pages.model')
var pageController = require('../controller/pages.controller')
var template = require('art-template')

const render = (req, res) => {
    const id = req.query.id
    if (id) {
        pageController.findById(id).then(function (entity) {
            var html = template('template', entity);
            res.send(html)
        })
        .catch ((err) => {
            res.send('找不到数据')
        })
    }else {
        res.send('缺少id')
    }

}
module.exports = render