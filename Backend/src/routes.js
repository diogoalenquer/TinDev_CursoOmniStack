const express = require('express');
const DevController = require('./controllers/DevController')

const routes = express.Router();


routes.get('/', (request, response) => {
    return response.json({message : 'Hello Dev =)'});
});

routes.post('/devs', DevController.store);

module.exports = routes;
