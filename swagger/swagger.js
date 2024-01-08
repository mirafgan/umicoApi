const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Umico Api",
            version: "1.0.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
            contact: {
                name: "Perfect Miri",
                url: "https://mirafgan.me",
                email: "dev@mirafgan.me",
            },
        },
        servers: [
            {
                url: "http://localhost:3001",
            }
        ],
    },
    apis: ["./routes/*.js"],
};
const specs = swaggerJSDoc(options);
module.exports = specs
