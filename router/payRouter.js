const exprerss = require('express');
const router = exprerss.Router();

const payController = require('../src/controllers/payController');

router.post('/order',payController.order_Product);
router.post('/',payController.index);
router.get('/hoanthanh',payController.complete_Pay);
router.get('/',payController.thanhtoan_Bill);


module.exports=router;