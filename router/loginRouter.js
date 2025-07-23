const exprerss = require('express');
const router = exprerss.Router();

const loginController = require('../src/controllers/loginController');

router.post('/',loginController.checkLogin);

module.exports= router;