const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Acesso não autorizado');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('id role');
        if (!user) return res.status(401).send('Usuário não encontrado');

        req.user = user; // Adiciona o usuário e sua role no objeto da requisição
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = authMiddleware;
