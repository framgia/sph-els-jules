require('dotenv').config();
const express = require('express');
const cors = require('cors');

const db = require('./models')
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(express.json())

app.use(authRoutes);
app.use('/users', usersRoutes);

db.sequelize.authenticate()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at ${PORT}`);
        })
    })
    .catch((error) => {
        console.log('Cannot connect to the database!')
    })

