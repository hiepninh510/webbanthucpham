const Product = require('../models/products')
const Cart = require('../models/carts');
const Bill = require('../models/bills');
const Login = require('../models/logins');
const {convertToVietnameseDateTime} = require('../models/formatDate');
const vietnamCurrency = require('../models/formatNumber');

class AdminController{
    index(req,res){
        Product.find({'isDelete':false})
        .then(products=>{
            const product_len = products.length
            res.render('admin',{layout:false,products,product_len});
        })
    }

    //Chỉnh sửa sản phẩm GET
    change_Product(req,res){
        Product.findOne({'_id':req.query.id})
        .then(product=>{
            res.render('change_product',{layout:false,product});
        })
    }

    //Chỉnh sửa sản phẩm POST
    chang_Product_Post(req, res) {
        Product.findOne({ '_id': req.body.IDproduct })
            .then(product => {
                if (product.name != req.body.nameproduct) {
                    product.set({
                        'name': req.body.nameproduct,
                    });
                }
                if (product.priceOld != req.body.priceOld) {
                    product.set({
                        'priceOld': req.body.priceOld,
                    });
                }
                if (product.priceNew != req.body.priceNew) {
                    product.set({
                        'priceNew': req.body.priceNew,
                    });
                }
                if (req.body.imgproduct) {
                    product.set({
                        'img': req.body.imgproduct,
                    });
                }
                if (product.number != req.body.numberproduct) {
                    product.set({
                        'sold': req.body.numberproduct,
                    });
                }
                if (product.brand != req.body.brand) {
                    product.set({
                        'brand': req.body.brand,
                    });
                }
                if (product.producer != req.body.producer) {
                    product.set({
                        'producer': req.body.producer,
                    });
                }
                // Lưu tất cả các thay đổi một lần duy nhất
                product.save()
                    .then(() => {
                        console.log("Đã lưu thành công!!!");
                        res.redirect('/admin');
                    })
                    .catch(err => {
                        console.error("Lỗi khi lưu sản phẩm:", err);
                        res.status(500).send("Đã xảy ra lỗi khi cập nhật sản phẩm");
                    });
            })
            .catch(err => {
                console.error("Lỗi khi tìm sản phẩm:", err);
                res.status(500).send("Đã xảy ra lỗi khi tìm sản phẩm");
            });
    }
    

    //Thêm sản phẩm
    themSanPham(req,res){
        res.render('add_product',{layout:false});
    }

    //Thêm sản phẩm vào csdl
    async post_themSanPham(req,res){
        const img = "https://hcm.fstorage.vn/images/2023/07/"+req.body.imgproduct
        const new_product = await new Product({
            'name':req.body.nameproduct,
            'sold':req.body.numberproduct,
            'priceOld':req.body.priceOld,
            'priceNew':req.body.priceNew,
            'brand':req.body.brand,
            'producer':req.body.producer,
            'img':img,
            'type':req.body.type,
        })
        await new_product.save()
        console.log("Thêm thành công !!!");
        res.redirect('/admin');
    }

    //Xóa sản phẩm
    delete_Product(req,res){
        console.log(req.body.delete_id);
        Product.findOne({'_id':req.body.delete_id})
        .then(product=>{
            product.set({
                isDelete: true,
            })
            product.save()
            console.log("Đã xóa thành công!!!")
            return true
        })
        .then(result =>{
            if(result){
                res.json({message:"Thành Công"});
            }
        })
        .catch(er=>{
            console.log(er);
        })
    }


    //Giỏ hàng
    cart_Client(req,res){
        let arr_email = [];
        Cart.find()
        .then(carts=>{
            carts.forEach(cart=>{
                if(!arr_email.some(email => email === cart.email)){
                    arr_email.push(cart.email);
                }
            })
            const len_email = arr_email.length;
            res.render('cart_client',{layout:false,len_email,arr_email,carts});
        })
        .catch(er=>{
            console.log(er);
        })
    }

    //Vào hóa đơn
    async bill(req,res){
        const bills =  await Bill.find()
        const len_bills = bills.length;
        let ar_bills = await seach_cart(bills,len_bills);
        let len_ar_bills = ar_bills.length;
        let sumrevenue = await sum_revenue(ar_bills);
       res.render('bills_client',{layout:false,ar_bills,len_ar_bills,sumrevenue})
        // res.redirect('/admin')
    }

    //Xóa sản phẩm  trong giỏ hàng mà khách hàng đã xóa
    delete_cart_delete(req,res){
        Cart.deleteOne({'_id':req.body.delete_id})
        .then(result=>{
            if(result.deletedCount > 0){
                res.json({message:"Thành Công"});
            }
        })
        .catch(er=>{
            console.log(er);
        })
    }

    //Tài Khoản khách hàng
    account_client(req,res){
        Login.find()
        .then(login=>{
            const ar_acc_access = [];
            const len_login = login.length;
            login.forEach(acc=>{
                ar_acc_access.push(convertToVietnameseDateTime(acc.accessdate));
            })
            res.render('account',{layout:false,len_login,login,ar_acc_access});
        })
        .catch(er=>{
            console.log(er);
        })
    }

    post_delete_acc(req,res){
        Login.deleteOne({emai:req.body.delete_id})
        .then(acc=>{
            if(acc.deletedCount >0){
                console.log("Xóa thành công");
                res.json({massage:'Thành Công!!!'});
            }
        })
        .catch(er=>{
            console.log(er);
        })
    }

}

async function seach_cart(data,len){
    let cart;
    let arr_id_carts;
    let arr_info_bill = {};
    let user;
    let arr_info_bills = [];
    for(let i = 0; i< len; i++){
        user = await Login.findOne({'_id':data[i].ttkh});
        arr_id_carts= data[i].carts;
        let len_cart = arr_id_carts.length
        cart = await find_Cart(arr_id_carts,len_cart);
        if(user){
            arr_info_bill={
                'username':user.userName,
                'email':user.email,
                'cart':cart,
                'sumprice':data[i].sumPrice,
                'datebuy':convertToVietnameseDateTime(data[i].dayBought),
            }
            arr_info_bills.push(arr_info_bill)
        }
    }
    // console.log(JSON.stringify(arr_info_bills, null, 2));
    return arr_info_bills;
}

async function find_Cart(data,len){
    let arr_cart=[];
    for(let i = 0 ; i < len; i++){
        const cart = await Cart.findOne({"_id":data[i]});
        if(cart){
            const extractedCart ={
                'nameproduct':cart.name,
                'img':cart.img,
                'number':cart.number,
                'price':cart.price,
            }
            arr_cart.push(extractedCart); 
        }
    }
    return arr_cart;
}

async function sum_revenue(data){
    // let sum = vietnamCurrency(0);
    let sum = 0;
    for(const i of data ){
        sum +=parseFloat(i.sumprice);
    }
    return vietnamCurrency(sum);
}

module.exports = new AdminController();