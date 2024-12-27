const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/dbConnect');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config(); // Carrega variáveis de ambiente

const app = express();

// Conectar ao banco de dados
connectDB();

app.use(cors());          // Para permitir requisições de diferentes origens
app.use(express.json());  // Para processar dados JSON

// Usar as rotas de usuário
app.use('/api/users', userRoutes);

// Usar as rotas de produtos
app.use('/api/product', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
