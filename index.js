const express = require('express');
const app = express();
const User = require('./models/user');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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


app.get('/', (req, res) => {
    res.send('HOME PAGE');
})

app.get('/registro', (req, res) => {
    res.render('registro');
})

app.post('/registro', async (req, res) => {
    const {username, password} = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username, 
        password: hash
    })
    await user.save();
    res.redirect('/');
})

app.get('/secret', (req, res) => {
    res.send('Esta es una página secreta solo para usuarios logueados');
})


app.listen(3000, (req, res) => {
    console.log('servidor en puerto 3000');
})