const render = (req, res, error) => {
    console.log(error)
    res.render('error', error)
}
module.exports = render