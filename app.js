const express = require('express');
const route = require('./router');
const app = express();
const path = require('path');
const bodyParser=require('body-parser');
const epressLayout = require("express-ejs-layouts");
const db = require("./src/config/db");
const session = require('express-session');
require('dotenv').config();



const port = process.env.PORT;

db.connect();

app.use('/src/public',express.static(path.join(__dirname, '/src/public')));

// app.use('/admin',express.static(path.join(__dirname, '/admin')));
app.use(epressLayout);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'my_session', // Key bí mật để ký và giải mã session
    resave: false,
    saveUninitialized: true
}));


route(app);


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"src","views"));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})

