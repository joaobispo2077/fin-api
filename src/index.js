
const express = require('express');
require('express-async-errors');

const { errorsMiddleware } = require('./middlewares/errors');
const routes = require('./routes');

const app = express();
app.use(express.json());

const PORT = 3333;

app.use(routes);
app.use(errorsMiddleware)

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));