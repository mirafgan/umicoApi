
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
app.get('/categories', async (req, res) => {
    const { data } = await fetchData("https://umico.az/catalog/v3/market/categories");
    const filter = ['id', "name", "slugged_name", "icons", "child_ids", "ascii_icon"]
    const keys = Object.keys(data[0]);
    const changeData = data.map((item) => {
        keys.forEach((i) => {
            if (!filter.includes(i)) item[i] = undefined
        })
        return item
    })
    res.send(changeData)
})
routes(app)
app.listen(5000)
