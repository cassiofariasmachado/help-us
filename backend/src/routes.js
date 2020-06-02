const express = require('express');

const auth = require('./middlewares/auth')

const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const UsersController = require('./controllers/UsersController');

const routes = express.Router();

routes.post('/users', UsersController.create);
routes.post('/users/login', UsersController.login);


const authRoutes = express.Router();

authRoutes.use(auth.authenticate)

authRoutes.get('/profile/:id', ProfileController.index);

authRoutes.get('/incidents', IncidentController.index);
authRoutes.post('/incidents', IncidentController.create);
authRoutes.delete('/incidents/:id', IncidentController.delete);

module.exports = { routes, authRoutes };
