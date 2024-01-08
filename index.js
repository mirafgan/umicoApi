
const express = require("express")
const routes = require("./routes/routes");
const swaggerUi = require('swagger-ui-express');
const specs = require("./swagger/swagger");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser")
app.use(cors())
app.use(bodyParser.json())
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
app.get("/",(req,res)=>res.send("salam"))
routes(app)
app.listen(5000)
