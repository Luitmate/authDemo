const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El campo no puede estar vacío']
    },
    password: {
        type: String,
        required: [true, 'El campo no puede estar vacío']
    }
})

module.exports = mongoose.model('User', userSchema);