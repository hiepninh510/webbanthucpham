const Login = require('../models/logins');
const Cart = require('../models/carts');

class LoginController {

    checkLogin(req,res){
        if(req.body.email ==='admin@gmail.com' && req.body.pass ==='admin12345'){
            res.redirect('/admin');
            return Promise.reject;
        }
        Login.findOne({'email':req.body.email,'pass':req.body.pass})
        .then(found =>{
            if(found){
                req.session.email=found.email;
                req.session.userName = found.userName;
                found.accessdate = new Date()
                found.save();
                return found.email;
            }
            else{
                res.redirect('/');
                return Promise.reject("Login failed");
            }
        })
        .then(email =>{
            var carts = Cart.find({'email':email,'isDelete':false,'bought':false});
            return carts;
        })
        .then(cart =>{
            if(cart){
                let count = 0;
                cart.forEach(ca=>{
                    count+=ca.number;
                })
                req.session.lenCart = count;
                console.log(req.session.lenCart);
                if(req.session.cart_Array){
                    req.session.lenCart += req.session.cart_Array.length;
                }
                res.redirect('/');
            }
        })
        .catch(err =>{
            console.log('ERROR: ',err);
        })
    }
}

module.exports = new LoginController();