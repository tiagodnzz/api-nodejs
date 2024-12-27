// src/middleware/roleMiddleware.js
const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem realizar essa ação.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = isAdmin;
