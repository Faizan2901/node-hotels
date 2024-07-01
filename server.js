const express = require('express')
const app = express()
const db = require('./db');
const Person = require('./models/person')
const MenuItem = require('./models/menu')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const personRoutes = require('./routes/personRoutes')
const menuItemsRoutes = require('./routes/menuItemsRoutes')

app.use('/person', personRoutes)
app.use('/menu', menuItemsRoutes)



app.listen(3000, () => {
    console.log("Server is running on port number 3000")
})