const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost/users');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB database'));

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
