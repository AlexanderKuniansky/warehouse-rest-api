const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db-pg-adapter/queries-data')
const userDb = require('./db-pg-adapter/queries-user')
const verifyToken = require('./authentication/verify-token')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

//Welcome message
app.get('/', (request, response) => {
  response.json({
    info: 'Here lies API that uses Node.js, Express and Postgres. Register at /register, no swagger yet' //TODO: edit if/when swagger added
  })
})

//Routing CRUD for categories, verifies token then sends to db adapter with pg queries
app.get('/categories', verifyToken, db.getCategories)
app.get('/categories/:id', verifyToken, db.getCategoryById)
app.post('/categories', verifyToken, db.createCategory)
app.put('/categories/:id', verifyToken, db.updateCategory)
app.delete('/categories/:id', verifyToken, db.deleteCategory)

//Routing CRUD for products
app.get('/products', verifyToken, db.getProducts)
app.get('/products/:id', verifyToken, db.getProductById)
app.post('/products', verifyToken, db.createProduct)
app.put('/products/:id', verifyToken, db.updateProduct)
app.delete('/products/:id', verifyToken, db.deleteProduct)

//Routes for registering and user login aka providing token
app.post('/register', userDb.createUser)
app.post('/login', userDb.loginUser)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})