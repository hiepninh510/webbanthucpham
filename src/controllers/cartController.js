const Cart = require('../models/carts');

// class CartController{
//     index(req,res){
//         console.log("Lại vào đây")
//         req.session.search=null;
//         let lentSearch = 0;
//         let search_value = '';
//         if(req.session.email){
//             if(req.session.cart_Array == undefined){
//                 Cart.find({'email':req.session.email,'isDelete':false,'bought':false})
//                 .then(carts =>{
//                     if(carts){
//                         const email=req.session.email;
//                         const userName = req.session.userName;
//                         const lenCart =req.session.lenCart; 
//                         res.render('cart',{carts,lenCart,email,userName,search_value,lentSearch});
//                     } 
//                 })
//             } else{
//                 var list_Product = req.session.cart_Array;
//                 var lenList_Product = req.session.cart_Array.length;
//                 var number=[];
//                 if(lenList_Product >1){
//                     for(let i=0 ;i<=lenList_Product-1;i++){
//                         var count = 1;
//                         for(let j=i+1;j<lenList_Product;j++){
//                             if(list_Product[i].name === list_Product[j].name){
//                                 count++;
//                                 list_Product.splice(j,1);
//                                 lenList_Product=list_Product.length;
//                             }
//                         }
//                         number.push(count);
//                     }
//                     for(let i =0;i<lenList_Product;i++){
//                         const newCart = new Cart({
//                             email:req.session.email,
//                             name:list_Product[i].name,
//                             img:list_Product[i].img,
//                             price:list_Product[i].priceNew,
//                             brand:list_Product[i].brand,
//                             number:number[i],
//                         })
//                         newCart.save();
//                         console.log('Đã lưu vào csdl');
//                     }
//                 }else{
//                     const newCart = new Cart({
//                         email:req.session.email,
//                         name:list_Product[0].name,
//                         img:list_Product[0].img,
//                         price:list_Product[0].priceNew,
//                         brand:list_Product[0].brand,
//                         number:1,
//                     })
//                     newCart.save();
//                 }
//                 req.session.cart_Array=null;
//                 Cart.find({'email':req.session.email,'isDelete':false,'bought':false})
//                     .then(carts =>{
//                         const email=req.session.email;
//                         const userName = req.session.userName;
//                         const lenCart = carts.length;
//                         res.render('cart',{carts,lenCart,email,userName,search_value,lentSearch});
//                     })
//             }
//         } else{
//             res.redirect('/');
//         }
//     }

//     postDelete_ID(req, res) {
//         // Hàm bất đồng bộ xóa dữ liệu
//         // const deleteDataAsync = async () => {
//         //     try {
//         //         await Cart.deleteOne({ '_id': req.body.delete_id });
//         //         return { message: 'Đã xóa' };
//         //     } catch (error) {
//         //         throw error;
//         //     }
//         // };
    
//         // Gọi hàm xóa dữ liệu và xử lý kết quả
//         // deleteDataAsync()
//         //     .then((result) => {
//         //         res.json(result); // Gửi phản hồi cho client
//         //     })
//         //     .catch((error) => {
//         //         console.error(error);
//         //         res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa dữ liệu.' });
//         //     });
//         if(req.body.delete_id){
//             Cart.findOne({'_id':req.body.delete_id})
//             .then(cart =>{
//                 if(cart){
//                     cart.set({isDelete:true});
//                     cart.save();
//                 } else{
//                     throw new Error('Không tìm thấy giỏ hàng');
//                 }
//                 req.session.lenCart -= cart.number;
//                 res.json(cart);
//             })
//             .catch(err =>{
//                 console.log(err);
//             })
//         } else if(req.body.plus_id){
//             Cart.findOne({'_id':req.body.plus_id})
//             .then(cart =>{
//                 if(cart){
//                     let number = cart.number+1;
//                     cart.set({number:number});
//                     cart.save();
//                 } else{
//                     throw new Error('Không tìm thấy giỏ hàng');
//                 }
//                 req.session.lenCart +=1;
//                 res.json(cart);
//             })
//             .catch(err =>{
//                 console.log(err);
//             })
//         } else if(req.body.minus_id){
//             Cart.findOne({'_id':req.body.minus_id})
//             .then(cart =>{
//                 if(cart){
//                     let number = cart.number-1;
//                     cart.set({number:number});
//                     cart.save();
//                 } else{
//                     throw new Error('Không tìm thấy giỏ hàng');
//                 }
//                 req.session.lenCart -=1;
//                 res.json(cart);
//             })
//             .catch(err =>{
//                 console.log(err);
//             })
//         }
//     }
    
    
// }

class CartController {

    // Trang giỏ hàng
    async index(req, res) {
        try {
            req.session.search = null;
            const search_value = '';
            const lentSearch = 0;

            if (!req.session.email) return res.redirect('/');

            const email = req.session.email;
            const userName = req.session.userName || '';

            // Nếu có giỏ hàng tạm lưu trong session trước khi đăng nhập
            if (req.session.cart_Array && req.session.cart_Array.length > 0) {
                await this._mergeCartSessionToDatabase(req);
                req.session.cart_Array = null;
            }

            const carts = await Cart.find({
                email,
                isDelete: false,
                bought: false
            });

            const lenCart = carts.reduce((total, item) => total + item.number, 0);
            req.session.lenCart = lenCart;

            res.render('cart', {
                carts,
                lenCart,
                email,
                userName,
                search_value,
                lentSearch
            });

        } catch (error) {
            console.error('Error loading cart page:', error);
            res.status(500).send("Đã xảy ra lỗi khi hiển thị giỏ hàng.");
        }
    }

    // Xử lý logic chuyển giỏ hàng từ session sang DB
    async _mergeCartSessionToDatabase(req) {
        const list = req.session.cart_Array || [];

        // Gom các sản phẩm trùng tên
        const mergedMap = new Map();

        for (const item of list) {
            if (!mergedMap.has(item.name)) {
                mergedMap.set(item.name, {
                    ...item,
                    number: 1
                });
            } else {
                mergedMap.get(item.name).number += 1;
            }
        }

        // Lưu vào database
        const promises = [];
        for (const item of mergedMap.values()) {
            const newCart = new Cart({
                email: req.session.email,
                name: item.name,
                img: item.img,
                price: item.priceNew,
                brand: item.brand,
                number: item.number,
            });
            promises.push(newCart.save());
        }

        await Promise.all(promises);
    }

    // Xử lý các thao tác (xóa, cộng, trừ) trong giỏ hàng
    async postDelete_ID(req, res) {
        try {
            const { delete_id, plus_id, minus_id } = req.body;
            let cart = null;

            if (delete_id) {
                cart = await Cart.findOne({ _id: delete_id });
                if (!cart) throw new Error("Không tìm thấy sản phẩm");

                cart.isDelete = true;
                await cart.save();

                req.session.lenCart -= cart.number;
            } 
            else if (plus_id) {
                cart = await Cart.findOne({ _id: plus_id });
                if (!cart) throw new Error("Không tìm thấy sản phẩm");

                cart.number += 1;
                await cart.save();

                req.session.lenCart += 1;
            } 
            else if (minus_id) {
                cart = await Cart.findOne({ _id: minus_id });
                if (!cart) throw new Error("Không tìm thấy sản phẩm");

                cart.number -= 1;
                await cart.save();

                req.session.lenCart -= 1;
            }

            res.json(cart);
        } catch (error) {
            console.error("Lỗi khi cập nhật giỏ hàng:", error);
            res.status(500).json({ message: 'Lỗi khi cập nhật giỏ hàng' });
        }
    }
}

module.exports = new CartController();