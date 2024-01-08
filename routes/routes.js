/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         name:
 *           type: string
 *   required:
 *     - id
 *     - name
 */
/**
 * @swagger
 * paths:
 *   /categories:
 *     get:
 *       summary: Apis
 *       tags:
 *         - categories
 *       description: Get all categories
 *       responses:
 *         '200':
 *            description: A list of categories.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/Category"
 */

const dbController = require("../controller/dbController");
const fetchData = require("../helpers/helpers");
const routes = require("express").Router()

    routes.get('/categories', async (req, res) => {
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


    routes.get("/categories/:sub", async (req, res) => {
        const { params: { sub } } = req
        const { data } = await fetchData(`https://umico.az/catalog/v3/market/categories?include_fields=node_category_slugged_name_az,child_ids&start_node_id=${sub}&node_type=ALL&q%5Bopaque_id%5D=%2F `)
        const filter = ['id', "name", "slugged_name", "icons", "child_ids", "ascii_icon"]
        const changeData = data.map((item) => {
            const keys = Object.keys(item);
            keys.forEach((i) => {
                if (!filter.includes(i)) item[i] = undefined
            })
            return item
        })
        res.send(changeData)
    });

    routes.get("/actual_categories", async (req, res) => {
        const { data } = await fetchData("https://umico.az/catalog/v3/market/popular_categories");
        res.send(data)
    })

    routes.get("/daily_discount", async (req, res) => {
        const { per_page } = req.query;
        const data = await fetchData(`https://umico.az/catalog/v3/market/products?per_page=${per_page ?? 10}&include_fields=id%2Cold_price%2Cretail_price%2Cavailability%2Cpreorder_available%2Cdefault_offer_id%2Cimg_url_thumbnail%2Cname%2Cmanufacturer%2Cavail_check%2Cstatus%2Cslugged_name%2Cdiscount%2Cdefault_marketing_name%2Cratings%2Coffers%2Coffers.retail_price%2Coffers.id%2Coffers.marketing_name%2Coffers.merchant_uuid%2Ccategory_id%2Cdefault_offer_allow_qty%2Coffers.uuid%2Coffers.partner_rating%2Cdefault_merchant_rating%2Cqty%2Cdefault_stock_control_mode%2Cdefault_show_stock_qty_threshold%2Cbest_installment_offer_id%2Coffers.supplier_id%2Cis_bulk_heavy%2Cdefault_merchant_uuid%2Coffers.seller_marketing_name%2Cdefault_offer_allow_qty%2Coffers.avail_check%2Cproduct_labels%2Cdefault_discount_effective_start_date%2Cdefault_discount_effective_end_date%2Cloyalty_cashback%2Ccategories%2Cmin_qty%2Cdiscounted%2Coffers.installment_enabled%2Coffers.max_installment_months%2Coffers.seller_id%2Coffers.seller_marketing_name%2Cmarket_lottery_default%2Cmarket_lottery_premium&exclude_fields=ratings.questions%2Cratings.assessment_id%2Cratings.product_id&q%5Bs%5D=global_popular_score%20desc&q%5Bstatus_in%5D=active&q%5Bdiscounted_today_eq%5D=true&q%5Bresponse_mode%5D=products&q%5Bopaque_id%5D=%2F`);
        res.send(data)
    })

    routes.get("/tags", async (req, res) => {
        const data = await fetchData("https://umico.az/catalog/v3/market/tags?q%5Bs%5D=random&q%5Btag_type%5D=seo&q%5Bmain_page%5D=true&per_page=30&q%5Bopaque_id%5D=%2F");
        res.send(data)
    })

    routes.get("/actual_categories", async (req, res) => {
        const { data } = await fetchData("https://umico.az/catalog/v3/market/popular_categories");
        res.send(data)
    })
    routes.post("/register", async (req, res) => {
        const registerRes = await dbController.register(req.body);
        res.send(registerRes)
    })
    routes.post("/login", async (req, res) => {
        const loginResponse = await dbController.login(req.body);
        res.send({ login: loginResponse })
    })

// routes(express())

module.exports = routes