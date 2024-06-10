const express = require('express');
const app = express();

const { newConnection } = require('./app.js');

app.use(express.json());

// Obtener todos los usuarios
app.get('/', async (req, res) => {
    const connection = await newConnection();
    const result = await connection.query('SELECT * FROM users_register');

    res.json(result[0]);

    connection.end();
})

// Obtener un solo usuario
app.get('/user_register/:id', async (req, res) => {
    const connection = await newConnection();
    const id = req.params.id;
    const result = await connection.query('SELECT * FROM users_register WHERE id = ?', id);

    res.status(200).json(result[0]);

    connection.end();
})

// Eliminar un usuario
app.delete('/users_register/:id', async (req, res) => {
    const connection = await newConnection();
    const id = req.params.id;
    const result = await connection.query('DELETE FROM users_register WHERE id = ?', id);

    res.status(200).json(result[0]);

    connection.end();
})

// Añadir un nuevo usuario
app.post('/', async (req, res) => {
    const connection = await newConnection();
    const { email, user, password } = req.body;
    await connection.query('INSERT INTO users_register (email, user, password) values (?,?,?)', [email, user, password]);

    res.send('Nuevo usuario creado');

    connection.end();
})

app.listen(4000);
console.log('Servidor iniciado!');