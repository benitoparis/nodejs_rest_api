
const checkAuth = (req, res, next)=> {
    if(!req.session.isLoggedIn){
        res.redirect('login');
    } else {
        next();
    }
}

module.exports = checkAuth;