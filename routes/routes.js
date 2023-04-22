const express = require('express')
const router = express.Router()

swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require('swagger-ui-express');
const swagger = require('../swagger');
const specs = swaggerJsdoc(swagger.swaggerDocument);

router.use('/users', require('./users.js'))
router.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));

module.exports = router;
