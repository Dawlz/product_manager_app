const displayMessage = require('../controllers/product.controller');
const Users = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
  app.get('/api', displayMessage.index);
  app.get('/api/users', displayMessage.findAllUsers);
  app.get('/api/user/:userName', displayMessage.findOneUser);
  app.get('/api/product/:userName/:id', displayMessage.showProductDetail);
  app.get('/api/products/:uid', authenticate, displayMessage.findUserProducts);
  app.get('/api/:id/:uid', authenticate, displayMessage.findOne);
  app.put('/api/:id/:uid', authenticate, displayMessage.updateProduct);
  app.post('/api/new/:uid', authenticate, displayMessage.createProduct);
  app.delete('/api/products/:id/:uid', authenticate, displayMessage.deleteProduct);
  app.post('/api/login', Users.logIn);
  app.post('/api/signup', Users.register);
  app.get('/api/logout', authenticate, Users.logOut)
}