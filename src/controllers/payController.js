const Bill = require('../models/bills');
const Cart = require('../models/carts');
const Login = require('../models/logins');
const vietnamCurrency = require('../models/formatNumber');

class PayController {
    index(req, res) {
        req.session.idCart = req.body.arr_id_product;
        res.json({ mesage: 'Thành công' });
    }

    async thanhtoan_Bill(req, res) {
        let arr_id_cart;
        let email;
        let sum_price=0;
        let sum_priceof_product =[];
        try {
            console.log("thanh toán đi");

            arr_id_cart = req.session.idCart;
            email = req.session.email;

            const carts = await findProductsByIds(arr_id_cart, email);
            carts.forEach(cart =>{
                sum_price = parseFloat(cart.price).toFixed(3)*cart.number;
                sum_priceof_product.push(vietnamCurrency(sum_price));
            })

            const len_Bill = carts.length;

            const sum =parseFloat(carts.reduce((total, cart) => total + cart.price*cart.number, 0));
            const price = vietnamCurrency(sum.toFixed(3));

            const user = await Login.findOne({ 'email': email });
            if (!user) {
                throw new Error("User not found");
            }

            res.render('pays', { layout: false,price,carts,user,len_Bill,sum_priceof_product});
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    }

    async order_Product(req,res){
        const bought = await change_Buyght(req.body.arr_id_cart);
        req.session.lenCart -=bought;
        if(bought){
            const newBill = await new Bill({
                carts: req.body.arr_id_cart,
                ttkh: req.body.id_user,
                sumPrice:req.body.sum_price,
            });
   
            await newBill.save();
            res.json({message:'Thành Công'});
        }

    }

    complete_Pay(req,res){
        console.log("Hello");
        res.render('complete',{layout:false});
    }
}

async function findProductsByIds(arr_id_cart, email) {
    let foundProducts = [];

    for (const id of arr_id_cart) {
        try {
            const product = await Cart.findOne({ email: email, _id: id,isDelete:false});
            if (product) {
                foundProducts.push(product);
            }
        } catch (error) {
            console.error("Error finding product:", error);
        }
    }

    return foundProducts;
}

async function change_Buyght(data){
        let count = 0;
        for(const id of data){
            try{
                const cart = await Cart.findOne({_id:id});
                if(cart){
                    cart.set({bought:true});
                    cart.save();
                    count +=cart.number;
                }
            } 
            catch (error){
                console.log(error);
            }
        }
    return count;
}
module.exports = new PayController();
