const Product = require("../models/products");
const Cart = require('../models/carts');

// class ProductController{
//     index(req,res){
//         if(!req.session.search){
//             req.session.search =[];
//         }
//         let search_history = req.session.search;
//         let lentSearch = req.session.search.length;
//         if(req.session.lenCart){
//             const lenCart = req.session.lenCart;
//             console.log(lenCart);
//             Product.find({'isDelete':false})
//             .then(products => {
//                 //Lưu danh sách sản phẩm
//                 req.session.products = products;
//                 if(req.session.email && req.session.userName){
//                     var email=req.session.email;
//                     var userName = req.session.userName;
//                 }
//                 const page = 1;
//                 const skipProducts = 0;
//                 const numPage = sharePage(products);
//                 let search_value = '';
//                 if(req.session.search){
//                     search_value = req.session.search[lentSearch -1];
//                 }
//                 res.render('trangchu',{products,numPage,page,skipProducts,email,userName,lenCart,search_value,lentSearch,search_history})
//             })
//         } else{
//             const lenCart = 0;
//             Product.find({'isDelete':false})
//             .then(products => {
//                 req.session.products = products;
//                 var email='';
//                 var userName ='';
//                 if(req.session.email && req.session.userName){
//                     email=req.session.email;
//                     userName = req.session.userName;
//                 }
//                 const page = 1;
//                 const skipProducts = 0;
//                 const numPage = sharePage(products);
//                 let search_value = '';
//                 if(req.session.search){
//                     search_value = req.session.search[lentSearch-1];
//                 }
//                 res.render('trangchu',{products,numPage,page,skipProducts,email,userName,lenCart,search_value,lentSearch,search_history})
//             })
//             .catch(error => {
//                 console.error(error);
//         });
//         }
//     }

//     //Chuyển trang
//     getPage(req,res){
//         const page = parseInt(req.query.page);
//         const skipProducts = 10 * (page-1);
//         let search_history = req.session.search;
//         let lentSearch = req.session.search.length;
//         let products = req.session.products;
//         if(req.session.lenCart){
//             const lenCart = req.session.lenCart;
//                 var email='';
//                 var userName ='';
//                 if(req.session.email && req.session.userName){
//                     email=req.session.email;
//                     userName = req.session.userName;
                    
//                 }
//                 const numPage = sharePage(products);
//                 let search_value = '';
//                 if(req.session.search){
//                     search_value = req.session.search;
//                 }
//                 res.render('trangchu',{products,numPage,page,skipProducts,email,userName,lenCart,search_value,lentSearch,search_history})
//             } 
//             else
//             {
//                 var email='';
//                 var userName ='';
//                 if(req.session.email && req.session.userName){
//                     email=req.session.email;
//                     userName = req.session.userName;
//                 }
//                 const numPage = sharePage(products);
//                 const lenCart = 0;
//                 let search_value = '';
//                 if(req.session.search){
//                     search_value = req.session.search;
//                 }
//                 res.render('trangchu',{products,numPage,page,skipProducts,email,userName,lenCart,search_value,lentSearch,search_history});
//         }
//     }

//     //Thêm sản phẩm vào giỏ hàng
//     async postAdd_Product_toCart(req,res){
//         console.log('Thêm sản phẩm vào giỏ hàng');
//         try{
//             const product = await Product.findOne({'_id':req.body.productId});
//             if(req.session.email){
//                 const name = await Cart.findOne({'name': product.name,'email':req.session.email,'isDelete':false,'bought':false});
//                 if(name){
//                     name.set({number:name.number+1});
//                     name.save();
//                     res.json({message:process.env.MESSAGE});
//                 } else{
//                     const newCart = await new Cart({
//                         email:req.session.email,
//                         name:product.name,
//                         img:product.img,
//                         price:product.priceNew,
//                         number:1,
//                         brand:product.brand,
//                     })
//                     await newCart.save();
//                     //Khi lúc đầu đăng nhập mà chưa có sản phẩn nào và khi thêm sản phẩm đầu tiên vào giỏ hàng
//                     if(!req.session.lenCart){
//                         req.session.lenCart = 0;
//                     }
//                     req.session.lenCart +=1;
//                     res.json({message:process.env.MESSAGE});
//                 }
//             } else {
//                 if(!req.session.cart_Array){
//                     req.session.cart_Array=[];
//                 } 
//                 req.session.cart_Array.push(product);
//                 console.log(req.session.cart_Array);
//                 res.json({message:process.env.MESSAGE});
//             }
//         }
//         catch(err){
//             console.log(err);
//         }
//     }

//     log_Out(req,res){
//         req.session.destroy();
//         console.log("Logout");
//         res.redirect('/');
//     }

//     //Tìm kiếm sản phẩm
//     search_Products(req,res){
//         if(!req.session.search){
//             req.session.search=[];
//         }
//         req.session.search.push(req.query.search);
//         let search_history = req.session.search;
//         let lentSearch = req.session.search.length;
//         let search_value = req.query.search;
//         let search_Arr = req.query.search.toLowerCase().split(' ');
//         Product.find()
//         .then(products =>{
//             let new_Arr = [];
//             products.forEach(product => {
//                 search_Arr.forEach(search=>{
//                     if(product.name.toLowerCase().includes(search)){
//                         if(!new_Arr.some(item => item.name === product.name)){
//                             new_Arr.push(product);
//                         }
//                     }
//                 })
//             });
//             return new_Arr;
//         })
//         .then(products=>{
//             const page = 1;
//             const skipProducts = 0;
//             const numPage = sharePage(products);
//             if(req.session.email){
//                 const email = req.session.email;
//                 const userName = req.session.userName;
//                 const lenCart = req.session.lenCart;
//                 res.render('trangchu',{products,email,userName,lenCart,page,skipProducts,numPage,search_value,lentSearch,search_history});
//             } else {
//                 const email='';
//                 const userName='';
//                 const lenCart=0;
//                 res.render('trangchu',{products,email,userName,lenCart,page,skipProducts,numPage,search_value,lentSearch,search_history});
//             }
//         })
//         .catch(er=>{
//             console.log(er);
//         })
//     }

//     //Giá từ thấp đến cao
//     min_To_Max(req,res){
//         Product.find({'isDelete':false})
//         .then(products =>{
//             let tam = null;
//             var lenProduct = products.length;
//             for(let i = 0; i < lenProduct;i++){
//                 for(let j = i+1;j < lenProduct;j++){
//                     if(parseFloat(products[i].priceNew) > parseFloat(products[j].priceNew)){
//                         tam = products[j];
//                         products[j]=products[i];
//                         products[i]=tam;
//                     }
//                 }
//             }
//             return products;
//         })
//         .then(products=>{
//             req.session.products = products;
//             if(req.session.email){
//                 let email = req.session.email;
//                 let userName = req.session.userName;
//                 const page = 1;
//                 const skipProducts = 0;
//                 const numPage = sharePage(products);
//                 let search_history = req.session.search;
//                 let lentSearch = req.session.search.length;
//                 let search_value = '';
//                 let lenCart = req.session.lenCart;
//                 res.render('trangchu',{products,email,userName,lenCart,page,skipProducts,numPage,search_value,lentSearch,search_history});
//             } else{
//                 let email ='';
//                 let userName = '';
//                 const page = 1;
//                 const skipProducts = 0;
//                 const numPage = sharePage(products);
//                 let search_history = req.session.search;
//                 let lentSearch = req.session.search.length;
//                 let search_value = '';
//                 let lenCart = 0;
//                 res.render('trangchu',{products,email,userName,lenCart,page,skipProducts,numPage,search_value,lentSearch,search_history});
//             }
//         })
//         .catch(er=>{
//             console.log(er);
//         })
//     }

//     max_To_Min(req,res){
//         Product.find({'isDelete':false})
//         .then(products =>{
//             let tam = null;
//             var lenProduct = products.length;
//             for(let i = 0; i < lenProduct;i++){
//                 for(let j = i+1;j < lenProduct;j++){
//                     if(parseFloat(products[i].priceNew) < parseFloat(products[j].priceNew)){
//                         tam = products[j];
//                         products[j]=products[i];
//                         products[i]=tam;
//                     }
//                 }
//             }
//             return products;
//         })
//         .then(products=>{
//             req.session.products = products;
//             if(req.session.email){
//                 let email = req.session.email;
//                 let userName = req.session.userName;
//                 const page = 1;
//                 const skipProducts = 0;
//                 const numPage = sharePage(products);
//                 let search_history = req.session.search;
//                 let lentSearch = req.session.search.length;
//                 let search_value = '';
//                 let lenCart = req.session.lenCart;
//                 res.render('trangchu',{products,email,userName,lenCart,page,skipProducts,numPage,search_value,lentSearch,search_history});
//             } else{
//                 let email ='';
//                 let userName = '';
//                 const page = 1;
//                 const skipProducts = 0;
//                 const numPage = sharePage(products);
//                 let search_history = req.session.search;
//                 let lentSearch = req.session.search.length;
//                 let search_value = '';
//                 let lenCart = 0;
//                 res.render('trangchu',{products,email,userName,lenCart,page,skipProducts,numPage,search_value,lentSearch,search_history});
//             }
//         })
//         .catch(er=>{
//             console.log(er);
//         })
//     }

// }

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
        const products = req.session.products || [];

        const search_value = req.session.search?.[req.session.search.length - 1] || '';
        const context = getRenderContext(req, products, page, skipProducts, search_value);
        res.render('trangchu', context);
    }

    async postAdd_Product_toCart(req, res) {
        try {
            const product = await Product.findOne({ _id: req.body.productId });

            if (req.session.email) {
                const name = await Cart.findOne({
                    name: product.name,
                    email: req.session.email,
                    isDelete: false,
                    bought: false
                });

                if (name) {
                    name.set({ number: name.number + 1 });
                    await name.save();
                } else {
                    await new Cart({
                        email: req.session.email,
                        name: product.name,
                        img: product.img,
                        price: product.priceNew,
                        number: 1,
                        brand: product.brand
                    }).save();

                    req.session.lenCart = (req.session.lenCart || 0) + 1;
                }

                res.json({ message: process.env.MESSAGE });
            } else {
                if (!req.session.cart_Array) req.session.cart_Array = [];
                req.session.cart_Array.push(product);
                res.json({ message: process.env.MESSAGE });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Đã xảy ra lỗi" });
        }
    }

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

function getRenderContext(req, products, page = 1, skipProducts = 0, search_value = '') {
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