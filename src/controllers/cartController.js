const Cart = require('../models/carts');

class CartController{
    index(req,res){
        console.log("Lại vào đây")
        req.session.search=null;
        let lentSearch = 0;
        let search_value = '';
        if(req.session.email){
            if(req.session.cart_Array == undefined){
                Cart.find({'email':req.session.email,'isDelete':false,'bought':false})
                .then(carts =>{
                    if(carts){
                        const email=req.session.email;
                        const userName = req.session.userName;
                        const lenCart =req.session.lenCart; 
                        res.render('cart',{carts,lenCart,email,userName,search_value,lentSearch});
                    } 
                })
            } else{
                var list_Product = req.session.cart_Array;
                var lenList_Product = req.session.cart_Array.length;
                var number=[];
                if(lenList_Product >1){
                    for(let i=0 ;i<=lenList_Product-1;i++){
                        var count = 1;
                        for(let j=i+1;j<lenList_Product;j++){
                            if(list_Product[i].name === list_Product[j].name){
                                count++;
                                list_Product.splice(j,1);
                                lenList_Product=list_Product.length;
                            }
                        }
                        number.push(count);
                    }
                    for(let i =0;i<lenList_Product;i++){
                        const newCart = new Cart({
                            email:req.session.email,
                            name:list_Product[i].name,
                            img:list_Product[i].img,
                            price:list_Product[i].priceNew,
                            brand:list_Product[i].brand,
                            number:number[i],
                        })
                        newCart.save();
                        console.log('Đã lưu vào csdl');
                    }
                }else{
                    const newCart = new Cart({
                        email:req.session.email,
                        name:list_Product[0].name,
                        img:list_Product[0].img,
                        price:list_Product[0].priceNew,
                        brand:list_Product[0].brand,
                        number:1,
                    })
                    newCart.save();
                }
                req.session.cart_Array=null;
                Cart.find({'email':req.session.email,'isDelete':false,'bought':false})
                    .then(carts =>{
                        const email=req.session.email;
                        const userName = req.session.userName;
                        const lenCart = carts.length;
                        res.render('cart',{carts,lenCart,email,userName,search_value,lentSearch});
                    })
            }
        } else{
            res.redirect('/');
        }
    }

    postDelete_ID(req, res) {
        // Hàm bất đồng bộ xóa dữ liệu
        // const deleteDataAsync = async () => {
        //     try {
        //         await Cart.deleteOne({ '_id': req.body.delete_id });
        //         return { message: 'Đã xóa' };
        //     } catch (error) {
        //         throw error;
        //     }
        // };
    
        // Gọi hàm xóa dữ liệu và xử lý kết quả
        // deleteDataAsync()
        //     .then((result) => {
        //         res.json(result); // Gửi phản hồi cho client
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa dữ liệu.' });
        //     });
        if(req.body.delete_id){
            Cart.findOne({'_id':req.body.delete_id})
            .then(cart =>{
                if(cart){
                    cart.set({isDelete:true});
                    cart.save();
                } else{
                    throw new Error('Không tìm thấy giỏ hàng');
                }
                req.session.lenCart -= cart.number;
                res.json(cart);
            })
            .catch(err =>{
                console.log(err);
            })
        } else if(req.body.plus_id){
            Cart.findOne({'_id':req.body.plus_id})
            .then(cart =>{
                if(cart){
                    let number = cart.number+1;
                    cart.set({number:number});
                    cart.save();
                } else{
                    throw new Error('Không tìm thấy giỏ hàng');
                }
                req.session.lenCart +=1;
                res.json(cart);
            })
            .catch(err =>{
                console.log(err);
            })
        } else if(req.body.minus_id){
            Cart.findOne({'_id':req.body.minus_id})
            .then(cart =>{
                if(cart){
                    let number = cart.number-1;
                    cart.set({number:number});
                    cart.save();
                } else{
                    throw new Error('Không tìm thấy giỏ hàng');
                }
                req.session.lenCart -=1;
                res.json(cart);
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }
    
    
}

module.exports = new CartController();