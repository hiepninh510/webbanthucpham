
const productRouter = require('./productRouter');
const loginRouter = require('./loginRouter');
const registerRouter = require('./registerRouter');
const cartRouter = require('./cartRouter');
const payRouter = require('./payRouter');
const adminRouter = require('./adminRouter');

function route(app){
    app.use('/login',loginRouter);

    app.use('/register',registerRouter);

    app.use('/cart',cartRouter);

    app.use('/thanhtoan',payRouter);

    app.use('/admin',adminRouter);

    app.use('/',productRouter);

}

module.exports = route;

