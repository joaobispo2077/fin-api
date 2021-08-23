const express = require('express');

const app = express();

const PORT = 3333;

app.get('/api', (req, res) => res.json({ message: 'hello world' }));

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));