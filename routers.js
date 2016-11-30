var errors = require('./components/errors')
var path = require('path')
var Pages = require('./api/pages/pages.model')
var pageController = require('./controller/pages.controller')
var template = require('art-template');

module.exports = function(app){
    app.use('/api/users', require('./api/user'));
    app.use('/api/articles', require('./api/article'));
    app.use('/api/pages', require('./api/pages'));
    app.use('/api/upload', require('./api/file'));
    app.use('/auth', require('./auth'))
    // 404错误处理
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    app.route('/perview')
        .get((req, res) => {
            pageController.findById('5837e9285ecfe60e41359a22').then(function (entity) {
                var html = template('template', entity);
                res.send(html)
            })
        })
    // 其他资源路由
    app.route('/*')
        .get((req, res) => {
            res.render('index')
        });
}
