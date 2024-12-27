const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true }, // Campo exclusivo para o ID do produto
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // A senha será armazenada como hash
    role: {
        type: String,
        enum: ['admin', 'user', 'employee'],  // 'admin' para quem pode criar produtos, 'user' para quem só pode visualizar
        default: 'user',
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
