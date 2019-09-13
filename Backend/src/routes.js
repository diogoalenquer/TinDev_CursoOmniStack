const express = require('express');

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({message : 'Hello Dev =)'});
});

routes.post('/devs', (request, response) => {
    return response.json(request.body);
});

module.exports = routes;
