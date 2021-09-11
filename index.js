const express = require('express');
const app = express();
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views'),

app.get('/registro', (req, res) => {
    res.render('registro');
})


app.get('/secret', (req, res) => {
    res.send('Esta es una página secreta solo para usuarios logueados');
})


app.listen(3000, (req, res) => {
    console.log('servidor en puerto 3000');
})