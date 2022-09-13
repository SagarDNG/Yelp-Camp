const User = require('../models/user.js');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
};

module.exports.createUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
};

module.exports.loginUser = (req, res, next) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.flash.returnTo || '/campgrounds';
    //use req.flash instead of req.session
    delete req.flash.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
    req.logout(function (e) {
        if (e) return next(e);
        req.flash('success', "Goodbye!");
        res.redirect('/campgrounds');
    });
};