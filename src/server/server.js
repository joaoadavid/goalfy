const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3001;

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'goalfy'
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida');
  }
});

app.use(cors());
app.use(express.json()); // Middleware para processar o corpo das requisições como JSON

// Rota para obter todos os clientes
app.get('/clientes', (req, res) => {
  const query = 'SELECT * FROM clientes';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar consulta:', err);
      res.status(500).json({ error: 'Erro ao buscar clientes' });
    } else {
      res.json(results);
    }
  });
});

// Rota para cadastrar um novo cliente
app.post('/clientes', (req, res) => {
  const novoCliente = req.body;

  const insertQuery = 'INSERT INTO clientes (nome, email, telefone, cnpj, endereco, cidade) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [novoCliente.nome, novoCliente.email, novoCliente.telefone, novoCliente.cnpj, novoCliente.endereco, novoCliente.cidade];

  connection.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir cliente:', err);
      res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    } else {
      console.log('Cliente cadastrado com sucesso');
      res.json({ message: 'Cliente cadastrado com sucesso', cliente: novoCliente });
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
