const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE341 Project 1 - Contacts API',
        description: 'API documentation for CSE341 Project 1',
    },
    host: 'localhost:3000', // Update this if deployed
    schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js']; // Update with your main route file

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server'); // Update with your server file
});