const Cart = require('../models/carts');
const Product = require("../models/products");

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
                console.log(req);
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
// Xử lý logic chuyển giỏ hàng từ session sang DB (có đối chiếu)
async _mergeCartSessionToDatabase(req) {
    const list = req.session.cart_Array || [];
    if (list.length === 0) return;

    // Gom sản phẩm trùng nhau trong session
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

    // Lấy giỏ hàng hiện có trong DB của user
    const existingCarts = await Cart.find({
        email: req.session.email,
        isDelete: false,
        bought: false
    });

    // So sánh và xử lý
    for (const item of mergedMap.values()) {
        const found = existingCarts.find(c => c.name === item.name);

        if (found) {
            // Nếu đã tồn tại thì cộng số lượng
            found.number += item.number;
            await found.save();
        } else {
            // Nếu chưa tồn tại thì thêm mới
            const newCart = new Cart({
                email: req.session.email,
                name: item.name,
                img: item.img,
                price: item.priceNew,
                brand: item.brand,
                number: item.number
            });
            await newCart.save();
        }
    }

    // Xóa giỏ hàng tạm trong session
    req.session.cart_Array = null;
}


    async postAdd_Product_toCart(req, res) {
        try {
            console.log('hello');
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