const Login = require('../models/logins');
const Cart = require('../models/carts');

class LoginController {

    // async checkLogin(req,res){
    //     try {
    //         if(req.body.email ==='admin@gmail.com' && req.body.pass ==='admin12345'){
    //             res.redirect('/admin');
    //             return Promise.reject("Login failed");
    //         }
    //         const found = await Login.findOne({'email':req.body.email,'pass':req.body.pass});
    //         if(found){
    //             console.log(found);
    //             req.session.email=found.email;
    //             req.session.userName = found.userName;
    //             found.accessdate = new Date()
    //             await found.save();
    //         } else {
    //             res.redirect('/');
    //             return Promise.reject("Login failed");
    //         }
    //         if (req.session.cart_Array && req.session.cart_Array.length > 0) {
    //         for (const product of req.session.cart_Array) {
    //             const existingItem = await Cart.findOne({
    //                 email: found.email,
    //                 name: product.name,
    //                 isDelete: false,
    //                 bought: false
    //             });

    //             if (existingItem) {
    //                 existingItem.number += product.number || 1; // cộng đúng số lượng
    //                 await existingItem.save();
    //             } else {
    //                 await new Cart({
    //                     email: found.email,
    //                     name: product.name,
    //                     img: product.img,
    //                     price: product.priceNew,
    //                     number: product.number || 1,
    //                     brand: product.brand
    //                 }).save();
    //             }
    //         }
    //         // Xoá giỏ hàng tạm sau khi merge
    //         req.session.cart_Array = [];
    //     }
    //         const carts = await Cart.find({'email':found.email,'isDelete':false,'bought':false});
    //         console.log(carts)
    //         if(carts && carts.length >0){
    //             let count = 0;
    //             carts.forEach(ca=>{
    //                 count+=ca.number;
    //             })
    //             req.session.lenCart = count;
    //             console.log(req.session.lenCart);
    //             if(req.session.cart_Array){
    //                 req.session.lenCart += req.session.cart_Array.length;
    //             }
    //             res.redirect('/');
    //         }else{
    //             res.redirect('/');
    //         }   
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    async checkLogin(req, res) {
    try {
        // Check admin
        if (req.body.email === 'admin@gmail.com' && req.body.pass === 'admin12345') {
            res.redirect('/admin');
            return Promise.reject("Login failed");
        }

        // Tìm tài khoản
        const found = await Login.findOne({ email: req.body.email, pass: req.body.pass });
        if (!found) {
            res.redirect('/');
            return Promise.reject("Login failed");
        }

        // Lưu session login
        req.session.email = found.email;
        req.session.userName = found.userName;
        found.accessdate = new Date();
        await found.save();

        // Merge giỏ hàng tạm (nếu có) vào DB
        if (req.session.cart_Array && req.session.cart_Array.length > 0) {
            console.log(req.session.cart_Array);
            for (const product of req.session.cart_Array) {
                const existingItem = await Cart.findOne({
                    email: found.email,
                    name: product.name,
                    isDelete: false,
                    bought: false
                });

                if (existingItem) {
                    existingItem.number += product.number || 1;
                    await existingItem.save();
                } else {
                    await new Cart({
                        email: found.email,
                        name: product.name,
                        img: product.img,
                        price: product.priceNew,
                        number: product.number || 1,
                        brand: product.brand
                    }).save();
                }
            }
            // Xoá giỏ hàng tạm sau khi merge
            req.session.cart_Array = [];
        }

        // Lấy lại giỏ hàng trong DB sau khi merge
        const carts = await Cart.find({
            email: found.email,
            isDelete: false,
            bought: false
        });

        // Cập nhật số lượng vào session
        req.session.lenCart = carts.reduce((sum, item) => sum + item.number, 0);

        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

}

module.exports = new LoginController();