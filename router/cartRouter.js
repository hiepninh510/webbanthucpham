const exprerss = require('express');
const router = exprerss.Router();

const cartController = require('../src/controllers/cartController');
router.post('/add-to-cart',cartController.postAdd_Product_toCart);
router.post('/',cartController.postDelete_ID);
router.use('/',cartController.index);


module.exports= router;

