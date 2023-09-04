require('dotenv').config();
const jwt = require('jsonwebtoken');

// Set token secret and expiration date from environment variables
const secret = process.env.JWT_SECRET || 'mysecretsshhhhh';
const expiration = process.env.JWT_EXPIRATION || '2h';        

const INVALID_TOKEN = 'Invalid token';
const STATUS_BAD_REQUEST = 400;

module.exports = {
  // // Middleware for our authenticated routes
  // authMiddleware: function ({ req, res, next }) {
  //   // Allows token to be sent via req.query or headers
  //   let token = req.query.token || req.headers.authorization || req.body.token;

  //   // Extract the token if it is sent via headers as "Bearer <token>"
  //   if (req.headers.authorization) {
  //     token = token.split(' ').pop().trim();
  //   }

  //   if (!token) {
  //     return next();  // Go to next middleware if token is not present
  //   }

  //   try {
  //     // Verify token and extract user data
  //     const { data } = jwt.verify(token, secret, { maxAge: expiration });
  //     req.user = data;
  //     console.log("jwt data:" , data)
  //   } catch (err) {
  //     console.log(INVALID_TOKEN);
  //     if (res) {
  //       return res.status(STATUS_BAD_REQUEST).json({ message: INVALID_TOKEN });
  //     }
  //     return next(err);
  //   }

  //   // Go to next endpoint
  //   return next();
  // },

  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  
  // Function to sign token
  signToken: function ({ user_name, email, _id }) {
    const payload = { user_name, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
