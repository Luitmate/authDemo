const express = require('express');
const app = express();
const User = require('./models/user');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

//------SET MONGOOSE------//
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/authDemo');
}

//------SET EJS------//
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')),

//------PARSER------//
app.use(express.urlencoded({ extended: true }))

//------SESSION------//
app.use(session({
    secret: 'secreto'
}))

const requireLogin = (req, res, next) => {
    if(!req.session.user_id) {
        return res.redirect('/login');
    }
    next()
}

app.get('/', (req, res) => {
    res.send('HOME PAGE');
})

app.get('/registro', (req, res) => {
    res.render('registro');
})

app.post('/registro', async (req, res) => {
    const {username, password} = req.body;
    const user = new User({username, password: hash})
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if(foundUser){
        req.session.user_id = foundUser._id;
        res.redirect('/secret');
    }else {
        res.redirect('/login');
    }
})


app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/login');
})

app.get('/secret', requireLogin, (req, res) => {
    res.render('secret');
})


app.listen(3000, (req, res) => {
    console.log('servidor en puerto 3000');
})