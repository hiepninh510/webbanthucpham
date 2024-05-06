const express = require('express');
const router = express.Router();

const RegisterController = require('../src/controllers/registerController');

router.post('/',RegisterController.index);
router.get('/',RegisterController.register_View);


module.exports=router;