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
    async change_Product(req,res){
        try {
            const product = await Product.findOne({'_id':req.query.id})
            res.render('change_product',{layout:false,product});
            
        } catch (error) {
            console.error(err);
            res.status(500).json({ message: "Đã xảy ra lỗi" });
        }
    }

    //Chỉnh sửa sản phẩm POST
    // chang_Product_Post(req, res) {
    //     Product.findOne({ '_id': req.body.IDproduct })
    //         .then(product => {
    //             if (product.name != req.body.nameproduct) {
    //                 product.set({
    //                     'name': req.body.nameproduct,
    //                 });
    //             }
    //             if (product.priceOld != req.body.priceOld) {
    //                 product.set({
    //                     'priceOld': req.body.priceOld,
    //                 });
    //             }
    //             if (product.priceNew != req.body.priceNew) {
    //                 product.set({
    //                     'priceNew': req.body.priceNew,
    //                 });
    //             }
    //             if (req.body.imgproduct) {
    //                 product.set({
    //                     'img': req.body.imgproduct,
    //                 });
    //             }
    //             if (product.number != req.body.numberproduct) {
    //                 product.set({
    //                     'sold': req.body.numberproduct,
    //                 });
    //             }
    //             if (product.brand != req.body.brand) {
    //                 product.set({
    //                     'brand': req.body.brand,
    //                 });
    //             }
    //             if (product.producer != req.body.producer) {
    //                 product.set({
    //                     'producer': req.body.producer,
    //                 });
    //             }
    //             // Lưu tất cả các thay đổi một lần duy nhất
    //             product.save()
    //                 .then(() => {
    //                     console.log("Đã lưu thành công!!!");
    //                     res.redirect('/admin');
    //                 })
    //                 .catch(err => {
    //                     console.error("Lỗi khi lưu sản phẩm:", err);
    //                     res.status(500).send("Đã xảy ra lỗi khi cập nhật sản phẩm");
    //                 });
    //         })
    //         .catch(err => {
    //             console.error("Lỗi khi tìm sản phẩm:", err);
    //             res.status(500).send("Đã xảy ra lỗi khi tìm sản phẩm");
    //         });
    // }

    async change_Product_Post(req,res){
        try {
            const product = await Product.findOne({'_id': req.body.IDproduct});
            if(!product) return res.status(404).send("Không tìm thấy sản phẩm");
            const fieldMap = {
                name: 'nameproduct',
                priceOld: 'priceOld',
                priceNew: 'priceNew',
                img: 'imgproduct',
                sold: 'numberproduct',
                brand: 'brand',
                producer: 'producer'
            };
            const updates = {};
            for(const [modelField,bodyField] of  Object.entries(fildedMap)){
                const newValue = req.body[bodyField];
                if(newValue !== undefined && product[modelField] !== newValue){
                    updates[modelField] = newValue;
                }
            }
            if(Object.keys(update).length === 0){
                return res.redirect('/admin');
            }
            product.set(updates);
            await product.save();
            console.log("Lưu thành công");
            res.redirect('/admin');
            
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", err);
            res.status(500).send("Đã xảy ra lỗi khi xử lý sản phẩm");
        }
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
    async delete_Product(req,res){
        try {
            const product = await Product.findOne({'_id':req.body.delete_id});
            product.set({ isDelete: true });
            await product.save();
            res.json({message:"Xóa Thành Công."});
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", err);
            res.status(500).send("Đã xảy ra lỗi khi xử lý sản phẩm");
        }
    }


    //Giỏ hàng
    async cart_Client(req,res){
        try {
            const carts = await Cart.find();
            const uniqueEmails = [...new Set(carts.map(cart => cart.email))];
            res.render('cart_client', {
                layout: false,
                len_email: uniqueEmails.length,
                arr_email: uniqueEmails,
                carts
            });
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu giỏ hàng:", err);
            res.status(500).send("Lỗi server khi truy xuất giỏ hàng");
        }
        // let arr_email = [];
        // Cart.find()
        // .then(carts=>{
        //     carts.forEach(cart=>{
        //         if(!arr_email.some(email => email === cart.email)){
        //             arr_email.push(cart.email);
        //         }
        //     })
        //     const len_email = arr_email.length;
        //     res.render('cart_client',{layout:false,len_email,arr_email,carts});
        // })
        // .catch(er=>{
        //     console.log(er);
        // })
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
    async account_client(req,res){
        // Login.find()
        // .then(login=>{
        //     const ar_acc_access = [];
        //     const len_login = login.length;
        //     login.forEach(acc=>{
        //         ar_acc_access.push(convertToVietnameseDateTime(acc.accessdate));
        //     })
        //     res.render('account',{layout:false,len_login,login,ar_acc_access});
        // })
        // .catch(er=>{
        //     console.log(er);
        // })
        try {
            const login = await Login.find();
            const len_login = login.length;
            const ar_acc_access = login.map(acc =>convertToVietnameseDateTime(acc.accessdate));
            res.render('account',{
                layout:false,
                len_login,
                login,
                ar_acc_access
            });
        } catch (error) {
            console(error);
        }
    }

    async post_delete_acc(req,res){
        try {
            const delete_acc = await Login.deleteOne({email:req.body.delete_id});
            if(delete_acc > 0) {
                console.log("Xóa thành công");
                res.json({message:'Thành Công!!!'});
            }  
        } catch (error) {
            console.log(error);
        }
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