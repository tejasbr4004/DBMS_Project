module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.username) {
        req.session.returnTo = req.originalUrl;
        return res.redirect('/login');
    }
    next();
}
