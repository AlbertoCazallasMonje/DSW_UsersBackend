const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Orion Users Backend",
            version: "1.0.0",
            description: "Swagger Documentation for APIs",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["App/Docs/UsersDocs.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;