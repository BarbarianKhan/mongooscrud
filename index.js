const { json } = require('body-parser');
const express = require('express');
require('./database/mongoose');
require('dotenv').config();
const routes = require('./routes');

const app= express();
app.use(express.json());
app.use('/',routes);

app.listen(process.env.PORT);