const Register = require('../models/logins');

class RegisterController{
    index(req,res){
        Register.find()
        .then(registers =>{
            const register = registers.some(register => register.email === req.body.email);
            if(register){
                req.session.isExisted = true;
                res.redirect('/register');
            } else{
                const newRegister = new Register({
                    email: req.body.email,
                    pass: req.body.pass,
                    userName: req.body.userName,
                    birthday: req.body.birthday,
                    address: req.body.address,
                    phone:req.body.phone
                });
                newRegister.save()
                .then(savedRegister =>{
                    console.log("Đã lưu thông tin mới vào CSDL:", savedRegister);
                    req.session.email = savedRegister.email;
                    req.session.userName = savedRegister.userName;
                    res.redirect('/');
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        })
        .catch(er=>{
            console.log('ERR: ',er);
        })

    }

    register_View(req,res){
       let isExisted = req.session.isExisted;
        res.render('register',{layout:false,isExisted});
    }
}

module.exports= new RegisterController();
