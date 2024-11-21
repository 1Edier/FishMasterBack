require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT;


app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));


app.use(express.json());

const loginRouter = require('./src/routes/login.route');
const userRouter = require('./src/routes/users.routes');
const especieRouter = require('./src/routes/especies.routes');
const especieAsignRouter = require('./src/routes/users.especies.routes');
const recomendacionesRouter = require('./src/routes/recomendations.routes');
const datosRouter = require('./src/routes/datos.routes');
const alimentacionRouter =require('./src/routes/alimentacion.routes')

const { authenticateToken } = require('./src/middleware/auth.middleware');

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/especies', especieRouter);
app.use('/especies_user', especieAsignRouter);
app.use('/recomendaciones', recomendacionesRouter);
app.use('/datos', datosRouter);
app.use('/alimentacion', alimentacionRouter);


app.listen(PORT, () => {
    console.log(`API escuchando en el puerto ${PORT}`);
});