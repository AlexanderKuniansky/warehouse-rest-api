// Used to create, sign, and verify tokens
const jwt = require('jsonwebtoken');

const verifyToken = (request, response, next) => {

  // Check header for token
  const token = request.headers['x-access-token'];
  if (!token) {
    return response.status(403).send({
      authentication: false,
      message: 'No token provided.'
    });
  }

  // Verify token
  jwt.verify(token, process.env.SECRET, (error, results) => {
    if (error) {
      response.status(400).send({
        authentication: false,
        message: 'Failed to authenticate token.'
      });
      throw error
    }

    // Save authenticated user id in case needed in the future
    request.userId = results.id
    next()
  });

}

module.exports = verifyToken;