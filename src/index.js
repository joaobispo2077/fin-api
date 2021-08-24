const express = require('express');
const { AccountRoutes } = require('./routes/AccountRoutes');

const app = express();
app.use(express.json());

const PORT = 3333;

app.use(AccountRoutes);

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));