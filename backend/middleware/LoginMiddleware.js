const LoginMiddleware = (req, res, next) => {
    if (req.session.isLoggedin) {
        return res.redirect('/')
    }
    next()
}

module.exports = LoginMiddleware;