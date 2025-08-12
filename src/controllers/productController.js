const Product = require("../models/products");
const Cart = require('../models/carts');

class ProductController {

    async index(req,res){
        try {
            if (!req.session.search) req.session.search= [];
            const products = await Product.find({isDelete:false});
            req.session.product = products;
            const search_value = req.session.search[req.session.search.length -1] || '';
            const context = getRenderContext(req,products,1,0,search_value);
            res.render('trangchu',context);
        } catch (error) {
            console.log(error);
            res.status(500).send("Lỗi server");
        }
    }

    getPage(req, res) {
        const page = parseInt(req.query.page) || 1;
        const skipProducts = 10 * (page - 1);
        const products = req.session.product || [];
        const search_value = req.session.search?.[req.session.search.length - 1] || '';
        const context = getRenderContext(req, products, page, skipProducts, search_value);
        res.render('trangchu', context);
    }

    // async postAdd_Product_toCart(req, res) {
    //     try {
    //         const product = await Product.findOne({ _id: req.body.productId });

    //         if (req.session.email) {
    //                 const name = await Cart.findOne({
    //                 name: product.name,
    //                 email: req.session.email,
    //                 isDelete: false,
    //                 bought: false
    //             });

    //             if (name) {
    //                 name.set({ number: name.number + 1 });
    //                 await name.save();
    //             } else {
    //                 await new Cart({
    //                     email: req.session.email,
    //                     name: product.name,
    //                     img: product.img,
    //                     price: product.priceNew,
    //                     number: 1,
    //                     brand: product.brand
    //                 }).save();

    //                 req.session.lenCart = (req.session.lenCart || 0) + 1;
    //             }

    //             res.json({ message: process.env.MESSAGE });
    //         } else {
    //             if (!req.session.cart_Array) req.session.cart_Array = [];
    //             req.session.cart_Array.push(product);
    //             res.json({ message: process.env.MESSAGE });
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).json({ message: "Đã xảy ra lỗi" });
    //     }
    // }

    log_Out(req, res) {
        req.session.destroy();
        res.redirect('/');
    }

    async search_Products(req, res) {
        try {
            const keyword = req.query.search?.trim();
            if (!keyword) return res.redirect('/');
            req.session.search = req.session.search || [];
            req.session.search.push(keyword);
            const search_Arr = keyword.toLowerCase().split(' ');
            const products = await Product.find();
            const matched = products.filter(product => 
                search_Arr.some(word => product.name.toLocaleLowerCase().includes(word))
            );
            const context = getRenderContext(req,matched,1,0,keyword);
            res.render('trangchu',context);
        } catch (error) {
            console.error(err);
            res.status(500).json({ message: "Đã xảy ra lỗi" });
        }
    }

    async min_To_Max(req, res) {
        try {
            const products = await Product.find({isDelete:false});
            products.sort((a,b)=>{parseFloat(a.priceNew)-parseFloat(b.priceNew)});
            req.session.products = products;
            const context = getRenderContext(req.products,1,0,'');
            res.render('trangchu',context);
            
        } catch (error) {
            console.error(err);
            res.status(500).send("Lỗi sắp xếp giá tăng dần");
        }

    }

    async max_To_Min(req, res) {
        try {
            const products = await Product.find({isDelete:false});
            products.sort((a,b)=>{parseFloat(b.priceNew)-parseFloat(a.priceNew)});
            req.session.products = products;
            const context = getRenderContext(req,products,1,0,'');
            res.render('trangchu',context);
            
        } catch (error) {
            console.error(err);
            res.status(500).send("Lỗi sắp xếp giá giảm dần");
        }
    }
}


function sharePage(data){
    const productLength = data.length;
    const numPage = Math.ceil(productLength/10);
    return numPage; 
}

function getRenderContext(req, products, page, skipProducts, search_value = '') {
    const email = req.session.email || '';
    const userName = req.session.userName || '';
    const lenCart = req.session.lenCart || 0;
    const search_history = req.session.search || [];
    const lentSearch = search_history.length;
    const numPage = sharePage(products);

    return {
        products,
        email,
        userName,
        lenCart,
        page,
        skipProducts,
        numPage,
        search_value,
        lentSearch,
        search_history
    };
}



module.exports = new ProductController()