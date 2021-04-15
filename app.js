const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db-pg-adapter/queries-data')
const userDb = require('./db-pg-adapter/queries-user')
const verifytoken = require('./authentication/verifytoken')
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
app.get('/categories', verifytoken, db.getCategories)
app.get('/categories/:id', verifytoken, db.getCategoryById)
app.post('/categories', verifytoken, db.createCategory)
app.put('/categories/:id', verifytoken, db.updateCategory)
app.delete('/categories/:id', verifytoken, db.deleteCategory)

//Routing CRUD for products
app.get('/products', verifytoken, db.getProducts)
app.get('/products/:id', verifytoken, db.getProductById)
app.post('/products', verifytoken, db.createProduct)
app.put('/products/:id', verifytoken, db.updateProduct)
app.delete('/products/:id', verifytoken, db.deleteProduct)

//Routes for registering and user login aka providing token
app.post('/register', userDb.createUser)
app.post('/login', userDb.loginUser)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})