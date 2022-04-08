if( process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const uuid = require('uuid')
const logins = require('./services/plogins') // use POSTGRESQL dal
//const logins = require('./services/mlogins') // use MONGODB dal

const app = express();

passport.use(new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
    let user = await logins.getLoginByEmail(email);
    if( user == null ) {
        return done(null, false, {message: 'No user with that email.'})
    }
    try {
        if( await bcrypt.compare(password, user.password)) {
            return done(null, user); 
        } else {
            return done(null, false, {message: 'Incorrect password was entered.'});
        }
    } catch (error) {
        return done(error);
    }
}))
passport.serializeUser((user, done) => {
    done(null, user._id)
});
passport.deserializeUser( async (id, done) => {
    let user = await logins.getLoginById(id);
    done(null, user);
});

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.username });
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let result = await logins.addLogin(req.body.name, req.body.email, hashedPassword, uuid.v4());
        res.redirect('/login');
    } catch(error) {
        console.log(error);
        res.redirect('/register');
    }
});

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('login');
})

function checkAuthenticated(req, res, next) {
    if ( req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if ( req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
}

app.listen(3000);