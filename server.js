const express = require('express')
const app = express()
const db = require('./db');
const Person = require('./models/person')
const MenuItem = require('./models/menu')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config();
const PORT = process.env.PORT || 3000

const personRoutes = require('./routes/personRoutes')
const menuItemsRoutes = require('./routes/menuItemsRoutes')

app.use('/person', personRoutes)
app.use('/menu', menuItemsRoutes)

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>My Node.js App</title>
        </head>
        <body>
            <h1>Hello, Mohammad Faizan!</h1>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log("Server is running on port number 3000")
})