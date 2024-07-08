const AuthMiddleware = (req, res, next) => {
    if (!req.session.isLoggedin) {
        return res.redirect('/login')
    }
    next()
}

module.exports = AuthMiddleware;