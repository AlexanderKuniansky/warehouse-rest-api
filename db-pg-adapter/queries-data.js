//TODO: Go through status codes, some are probably wrong

//Connect to postgres database
const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

// CRUD for catagories
const getCategories = (request, response) => {
  pool.query('SELECT * FROM categories ORDER BY id ASC', (error, results) => {
    if (error) {
      return response.status(404).json('Categories not found') //TODO: This is not great, optimally regex or provide checks  for lack of key/value, key/value length and throw actual error
      //throw error
    }
    return response.status(200).json(results.rows)
  })
}

const getCategoryById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM categories WHERE id = $1', [id], (error, results) => {
    if (error) {
      return response.status(406).json('Invalid input')
      //throw error
    }
    if (results.rows.length === 0) {
      return response.status(406).json('No category found')
    }
    return response.status(200).json(results.rows)
  })
}

const createCategory = (request, response) => {
  const {
    category_name
  } = request.body
  pool.query('INSERT INTO categories (category_name) VALUES ($1) RETURNING id', [category_name], (error, results) => {
    if (error) {
      return response.status(406).send(`Category can't be added`)
      //throw error
    }
    return response.status(201).send(`Category added with ID:${results.rows[0].id}`)
  })
}

const updateCategory = (request, response) => {
  const id = parseInt(request.params.id)
  const {
    category_name
  } = request.body

  pool.query(
    'UPDATE categories SET category_name = $1 WHERE id = $2',
    [category_name, id],
    (error, results) => {
      if (error) {
        return response.status(406).send(`Category can't be updated`)
        //throw error
      }
      return response.status(200).send(`Category modified with ID: ${id}`)
    }
  )
}

const deleteCategory = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM categories WHERE id = $1', [id], (error, results) => {
    if (error) {
      return response.status(406).send(`Category can't be deleted`)
      //throw error
    }
    if (results.rowCount == 0) {
      return response.status(200).send(`No category with ID: ${id}`)
    } else {
      return response.status(200).send(`Category deleted with ID: ${id}`)
    }
  })
}




const getProducts = (request, response) => {
  pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
    if (error) {
      return response.status(404).json('Products not found')
      //throw error
    }
    return response.status(200).json(results.rows)
  })
}

const getProductById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      return response.status(406).json('Invalid input')
      //throw error
    }
    if (results.rows.length === 0) {
      return response.status(406).json('No product found')
    }
    return response.status(200).json(results.rows)
  })
}

const createProduct = (request, response) => {
  const {
    product_name,
    product_description,
    price_per_piece,
    quantity,
    category_id
  } = request.body
  pool.query(
    'INSERT INTO products (product_name, product_description, price_per_piece, quantity, category_id) VALUES ($1,$2,$3,$4,$5) RETURNING id',
    [product_name, product_description, price_per_piece, quantity, category_id],
    (error, results) => {
      if (error) {
        return response.status(406).send(`Product can't be added`)
        //throw error
      }
      return response.status(201).send(`Product added with ID:${results.rows[0].id}`)
    })
}

const updateProduct = (request, response) => {
  const id = parseInt(request.params.id)
  const {
    product_name,
    product_description,
    price_per_piece,
    quantity,
    category_id
  } = request.body

  pool.query(
    'UPDATE products SET (product_name, product_description, price_per_piece, quantity, category_id) = ($1,$2,$3,$4,$5) WHERE id = $6 ',
    [product_name, product_description, price_per_piece, quantity, category_id, id],
    (error, results) => {
      if (error) {
        return response.status(406).send(`Product can't be updated`)
        //throw error
      }
      return response.status(200).send(`Product modified with ID: ${id}`)
    }
  )
}

const deleteProduct = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      return response.status(406).send(`Product can't be deleted`)
      //throw error
    }
    if (results.rowCount == 0) {
      return response.status(200).send(`No product with ID: ${id}`)
    } else {
      return response.status(200).send(`Product deleted with ID: ${id}`)
    }
  })
}

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,

  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}