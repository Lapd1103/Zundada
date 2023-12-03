module.exports = {
    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/login');
    },

    isNotLoggedIn(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/home');
    },

    isAdmin(req,res,next){
        if(req.user.Rol == "Administrador"){
            return next();
        }
        return res.redirect('/home');
    },

    isOrganizador(req,res,next){
        if(req.user.Rol == "Organizador" || req.user.Rol == "Administrador"){
            return next();
        }
        return res.redirect('/home');
    }
};