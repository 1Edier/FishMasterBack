require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Rutas
const loginRouter = require('./src/routes/login.route');
const userRouter = require('./src/routes/users.routes');
const especieRouter = require('./src/routes/especies.routes');
const especieAsignRouter = require('./src/routes/users.especies.routes');
const recomendacionesRouter = require('./src/routes/recomendations.routes');
const datosRouter = require('./src/routes/datos.routes');
const alimentacionRouter = require('./src/routes/alimentacion.routes');

const { authenticateToken } = require('./src/middleware/auth.middleware');

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/especies',authenticateToken, especieRouter);
app.use('/especies_user',authenticateToken, especieAsignRouter);
app.use('/recomendaciones',authenticateToken, recomendacionesRouter);
app.use('/datos',authenticateToken, datosRouter);
app.use('/alimentacion',authenticateToken, alimentacionRouter);

// Inicia el servidor Flask (Python)
console.log("Iniciando servidor Flask...");
const pythonProcess = spawn('python', ['./src/calculations/recomendaciones.py'], {
    stdio: 'inherit' // Transfiere directamente los logs a la consola de Node.js
});

pythonProcess.on('error', (err) => {
    console.error(`[Error al iniciar Python]: ${err.message}`);
});

pythonProcess.on('close', (code) => {
    console.log(`[Python terminado con código]: ${code}`);
    if (code !== 0) {
        console.error('El servidor Flask se cerró inesperadamente.');
    }
});

// Inicia el servidor Node.js
app.listen(PORT, () => {
    console.log(`API de Node.js escuchando en el puerto ${PORT}`);
});
