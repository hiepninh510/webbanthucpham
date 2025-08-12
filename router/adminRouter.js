const exprerss = require('express');
const router = exprerss.Router();

const adminController = require('../src/controllers/adminController')

router.get('/changeproduct',adminController.change_Product);
router.get('/account',adminController.account_client);
router.post('/giohang/delete',adminController.delete_cart_delete);
router.get('/bill',adminController.bill);
router.get('/themsanpham',adminController.themSanPham);
router.post('/delete-account',adminController.post_delete_acc);
router.get('/giohang',adminController.cart_Client);
router.post('/deleteproduct',adminController.delete_Product);
router.post('/changeproduct',adminController.change_Product_Post);
router.post('/themsanpham',adminController.post_themSanPham);
router.get('/',adminController.index);


module.exports= router;