const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000;

// Configura tu conexión a la base de datos
const connection = mysql.createConnection({
  host: 'autorack.proxy.rlwy.net',
  port: 22385,
  user: 'root',
  password: 'IYXCpeVaIYMaLTODvNnVTgqBHPmXqSbH',
  database: 'railway'
});

connection.connect();

// Middleware para parsear JSON
app.use(cors()); 
app.use(express.json());

// Endpoint para inicio de sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Verifica que el email y la contraseña estén presentes
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  // Busca al usuario en la base de datos
  connection.query('SELECT * FROM Usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al consultar la base de datos' });
    }
  
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  
    const user = results[0];
  
    // Compara las contraseñas directamente si están en texto plano
    if (password !== user.password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  
    // Si las contraseñas coinciden, genera el token
    const token = jwt.sign({ user_id: user.user_id, nombre: user.nombre, email: user.email }, 'tu_clave_secreta', {
      expiresIn: '1h'
    });
  
    return res.json({ user, token });
  });
});

app.post('/register', (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  connection.query('SELECT * FROM Usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al consultar la base de datos' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    connection.query('INSERT INTO Usuarios (nombre, email, password) VALUES (?, ?, ?)', [nombre, email, password], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error al registrar el usuario' });
      }

      return res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  });
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});
