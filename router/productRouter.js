const express=require('express');
const router = express.Router();

const productController = require('../src/controllers/productController');

router.get('/trangchu',productController.getPage);
router.get('/min-to-max',productController.min_To_Max);
router.get('/max-to-min',productController.max_To_Min);
router.get('/logout',productController.log_Out);
router.get('/search',productController.search_Products);
router.post('/add-to-cart',productController.postAdd_Product_toCart);
router.get('/',productController.index);

module.exports = router;