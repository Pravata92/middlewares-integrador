module.exports =(req, res, next) => {
    res.locals.userLog = false;

    if(req.session.user){
        res.locals.userLog = req.session.user;
    }
    
    return next()
}