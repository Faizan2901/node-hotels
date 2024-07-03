const express = require('express')
const app = express()
const db = require('./db');
const MenuItem = require('./models/menu')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config();
const PORT = process.env.PORT || 3000
const passport = require('./auth')

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
}

const personRoutes = require('./routes/personRoutes')
const menuItemsRoutes = require('./routes/menuItemsRoutes')

app.use(logRequest)
app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local', { session: false })

app.use('/person', personRoutes)
app.use('/menu', localAuthMiddleware, menuItemsRoutes)

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