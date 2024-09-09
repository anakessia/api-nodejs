const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Rota para a URL raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo à API de Usuários!');
});


// Dados de usuários
let users = [
    {id: 1, name: 'Ana Oliveira', email: 'anaoliveira@example.com'},
    {id: 2, name: 'Maria Silva', email: 'mariasilva@example.com'}
];

// Rota para listar todos os usuários
app.get('/users', (req, res) => {
    res.json(users);
});

// Rota para buscar um usuário por ID
app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

// Rota para criar um novo usuário
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Rota para atualizar um usuário por ID
app.put('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (user) {
      const { name, email } = req.body;
      user.name = name || user.name;
      user.email = email || user.email;
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

// Rota para deletar um usuário por ID
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      res.json({ message: 'Usuário deletado com sucesso' });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor iniciando em http://localhost:${port}`);
});
