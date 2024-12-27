const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // Importar o UUID

// Registrar um novo usuário
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const hashedPassword = await argon2.hash(password);

        const newUser = new User({
            id: uuidv4(), // Gerar um ID único
            username,
            email,
            password: hashedPassword,
            role: role || 'user' // Define 'user' como padrão, caso não seja especificado
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login do usuário
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) return res.status(400).json({ message: 'Senha inválida' });

        const token = jwt.sign(
            { id: user._id, role: user.role }, // Inclui a role no token
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar todos os usuários (requere autenticação e ser admin)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'username email role'); // Retorna apenas os campos necessários
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar o perfil do usuário (requere autenticação)
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id, 'username email role'); // Retorna apenas os campos necessários
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar dados do usuário (requere autenticação)
const updateUser = async (req, res) => {
    const { username, email } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        user.username = username || user.username;
        user.email = email || user.email;

        await user.save();
        res.json({ message: 'Usuário atualizado com sucesso', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Excluir um usuário (requere autenticação e ser admin)
const deleteUser = async (req, res) => {
    const { id } = req.body; // Recebe o ID do usuário a ser excluído no corpo da requisição

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getProfile,
    updateUser,
    deleteUser
};
