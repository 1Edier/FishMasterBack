require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const loginRouter = require('./src/routes/login.route');
const userRouter = require('./src/routes/users.routes');

const { authenticateToken } = require('./src/middleware/auth.middleware');

app.use('/login', loginRouter);
app.use('/users', authenticateToken, userRouter);


app.listen(PORT, () => {
    console.log(`API escuchando en el puerto ${PORT}`);
});