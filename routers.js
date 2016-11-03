var errors = require('./components/errors')
var path = require('path')

module.exports = function(app){
    app.use('/api/users', require('./api/user'));
    app.use('/auth', require('./auth'))
    // 404错误处理
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // 其他资源路由
    app.route('/*')
        .get((req, res) => {
            res.render('index')
        });
}
