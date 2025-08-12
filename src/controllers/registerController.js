const Register = require('../models/logins');

class RegisterController{
    async index(req,res){
        try {
            const registers = await Register.find();
            const register = registers.some(register => register.email === req.body.email );
            if(register){
                req.sesion.isExisted =true;
                res.redirect('/register');
            } else {
                const newRegister = new Register({
                    email: req.body.email,
                    pass: req.body.pass,
                    userName: req.body.userName,
                    birthday: req.body.birthday,
                    address: req.body.address,
                    phone:req.body.phone
                })
                await newRegister.save();
                req.sesion.email = newRegister.email;
                req.sesion.userName = newRegister.userName;
                res.redirect('/');
            }  
        } catch (error) {
            console.log(error);
        }

        // Register.find()
        // .then(registers =>{
        //     const register = registers.some(register => register.email === req.body.email);
        //     if(register){
        //         req.session.isExisted = true;
        //         res.redirect('/register');
        //     } else{
        //         const newRegister = new Register({
        //             email: req.body.email,
        //             pass: req.body.pass,
        //             userName: req.body.userName,
        //             birthday: req.body.birthday,
        //             address: req.body.address,
        //             phone:req.body.phone
        //         });
        //         newRegister.save()
        //         .then(savedRegister =>{
        //             console.log("Đã lưu thông tin mới vào CSDL:", savedRegister);
        //             req.session.email = savedRegister.email;
        //             req.session.userName = savedRegister.userName;
        //             res.redirect('/');
        //         })
        //         .catch(err=>{
        //             console.log(err);
        //         })
    }

    register_View(req,res){
       let isExisted = req.session.isExisted;
        res.render('register',{layout:false,isExisted});
    }
}

module.exports= new RegisterController();
