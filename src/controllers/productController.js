const Product = require('../models/Product');
const { v4: uuidv4 } = require('uuid'); // Importar o UUID

// Criar um novo produto
const createProduct = async (req, res) => {
    const { name, description, price, image } = req.body;

    try {
        const newProduct = new Product({
            id: uuidv4(), // Gerar um ID único
            name,
            description,
            price,
            image
        });

        await newProduct.save();
        res.status(201).json({ message: 'Produto criado com sucesso', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Listar todos os produtos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//atualiza produto
const updateProduct = async (req, res) => {
    const { id } = req.params; // Usar o campo `id`
    const { name, description, price, image } = req.body;

    try {
        const product = await Product.findOne({ id }); // Buscar pelo campo `id`
        if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image = image || product.image;

        await product.save();
        res.json({ message: 'Produto atualizado com sucesso', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//deleta produto
const deleteProduct = async (req, res) => {
    const { id } = req.params; // Usar o campo `id`

    try {
        const product = await Product.findOneAndDelete({ id }); // Buscar pelo campo `id`
        if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

        res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
};
