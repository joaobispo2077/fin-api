const express = require('express');

const app = express();

const PORT = 3333;

app.get('/api', (req, res) => res.json({ message: 'hello world' }));

app.get('/courses', (req, res) =>
  res.json(['Análise e Desenvolvimento de Sistemas', 'Medicina', 'Recursos Humanos']));
app.post('/courses', (req, res) => res.status(201).json());

app.get('/courses/:id', (req, res) => res.status(201).json({ name: 'Medicina' }));
app.put('/courses/:id', (req, res) => res.status(206).json());
app.patch('/courses/:id', (req, res) => res.status(204).json());
app.delete('/courses/:id', (req, res) => res.status(204).json());

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));