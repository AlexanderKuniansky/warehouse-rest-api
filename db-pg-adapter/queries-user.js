const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})
const jwt = require('jsonwebtoken') // Used to create, sign, and verify tokens
const bcrypt = require('bcryptjs') // Used for encrypting/decrypting

//Register user and give him token
const createUser = (request, response) => {

  const {
    user_name,
    user_login,
    user_password
  } = request.body

  //Checks all needed values are present
  if (!user_name || !user_login || !user_password) {
    return response.status(401).send({
      authentication: false,
      message: 'Name, login and password needed'
    })
  } //TODO: Cut this ducktaped check if/when proper check implemented

  const hashed_password = bcrypt.hashSync(user_password, 8)

  pool.query(
    'INSERT INTO users (user_name, user_login, user_password) VALUES($1, $2, $3) RETURNING id ',
    [user_name, user_login, hashed_password],
    (error, results) => {
      if (error) {
        //If value too long gonna error, or if already exists - no bueno
        return response.status(401).send({
          authentication: false,
          message: "User can't be created"
        })
        // throw error
      }
      // Create a token
      const token = jwt.sign({
        id: results.rows[0].id
      }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 7 // expires in 7 days
      })
      //Return token
      return response.status(200).send({
        authentication: true,
        token: token
      })
    })
}

//Check login & password and provide user with token
const loginUser = (request, response) => {

  const {
    user_login,
    user_password
  } = request.body

  if (!user_login || !user_password) {
    return response.status(401).send({
      authentication: false,
      message: 'Login and password needed'
    })
  }

  pool.query(
    'SELECT * FROM users WHERE user_login = $1 ',
    [user_login],
    (error, results) => {
      if (error) {
        return response.status(401).send({
          authentication: false,
          message: 'Wrong input'
        })
        // throw error
      }

      if (results.rows.length === 0) {
        return response.status(406).json('Username not found')
      }

      // Check if the password is valid
      const passwordIsValid = bcrypt.compareSync(user_password, results.rows[0].user_password)
      if (!passwordIsValid)
        return response.status(401).send({
          authentication: false,
          message: 'Wrong password'
        })
      // If user is found and password is valid create token
      const token = jwt.sign({
        id: results.rows[0].id
      }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 7 // expires in 7 days
      })

      return response.status(200).send({
        authentication: true,
        token: token
      })
    }
  )
}

module.exports = {
  createUser,
  loginUser
}