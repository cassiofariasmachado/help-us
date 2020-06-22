const express = require('express');

const auth = require('./middlewares/auth')

const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const UsersController = require('./controllers/UsersController');

const routes = express.Router();

routes.post('/api/users', UsersController.create);
routes.post('/api/users/login', UsersController.login);

const authRoutes = express.Router();

authRoutes.use(auth.authenticate);

authRoutes.get('/api/profile/:id', ProfileController.index);

authRoutes.get('/api/incidents', IncidentController.index);
authRoutes.get('/api/incidents/:id', IncidentController.get);
authRoutes.post('/api/incidents', IncidentController.create);
authRoutes.put('/api/incidents/:id', IncidentController.update);
authRoutes.delete('/api/incidents/:id', IncidentController.delete);
authRoutes.post('/api/incidents/:id/accept', IncidentController.accept);

module.exports = { routes, authRoutes };
