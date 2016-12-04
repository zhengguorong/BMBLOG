var template = require('art-template')

const render = (req, res, err) => {
    let html = template('error', err);
    res.send(html)
}
module.exports = render