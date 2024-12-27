const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true }, // Campo exclusivo para o ID do produto
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
