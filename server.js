const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex = require('knex');
const { response } = require('express');

const register=require('./controller/register');
const signin = require('./controller/signin');
const profile=require('./controller/profile');
const image= require('./controller/image');

const db=knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl:true, 
    }
});

const app=express();

app.use(express.json());
app.use(cors());
//Now we can also use express.json();
//app.use(bodyParser.json());



//Root Route
app.get('/',(req,res)=>{
    res.send('success');
});


//using advanced function we can avoid sending req,res
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)});


app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});


app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)});


app.put('/image',(req,res)=>{image.handleImage(req,res,db)});


app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)});


//Asynchrounous Way

 // bcrypt.compare("apples", '$2a$10$YEC0sdPwpO0OsbAJKgEW2OlUfTo1dyhvuwybMpagIyNdB//TjU.7y', function(err, res) {
    //     console.log('first',res);
    // // res == true
    // });

    // bcrypt.compare("veggies", '$2a$10$YEC0sdPwpO0OsbAJKgEW2OlUfTo1dyhvuwybMpagIyNdB//TjU.7y', function(err, res) {
    //     console.log('second',res);
    // // res = false
    // });

     // bcrypt.hash(password, null, null, function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);

    // });




app.listen(process.env.PORT||3000,()=>{
    console.log(`App is running on port ${process.env.PORT}`);
});
/*

    / --> get request -> res = this is working

    /signin --> post request -> res success/fail

    /register --> post = user

    /profile/:userId  --> Get =user
    
    //Variable parameter /:userId

    /image --> PUT (updating the score) -> res updating user object (rank)

*/