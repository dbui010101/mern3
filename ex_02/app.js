const mongoose = require('mongoose');
const Bcrypt = require("bcryptjs");
const saltRounds = 10;
var express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extend: true }));

mongoose.connect('mongodb://127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, autoIndex: true}) 
  const inscriptionSchema = new mongoose.Schema({
    login: { type: String,index: true, unique: true, minLength: 5, maxLength: 20 },
    email: { type: String,index: true, unique: true },
    password: { type: String },
    admin: Boolean
  });
  const loginSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
  });

  const ins = mongoose.model('inscription', inscriptionSchema);
  const UserModel = mongoose.model("inscriptions", {
    email: String,
    password: String,
    login: String
  });
  
  app.post("/register", async function (request, response) {

     valeurlogin =  request.body.login; 
     valeuremail =  request.body.email; 
     valeurpassword =  request.body.password; 
     valeurpasswordConfirm =  request.body.passwordConfirm;
    
    if(valeurlogin && valeuremail && valeurpassword==valeurpasswordConfirm){
      const hash = Bcrypt.hashSync(valeurpassword, saltRounds);
      const people = new ins({ 
        login: valeurlogin,
        email: valeuremail,
        password: hash,
        admin: false
      });
      
      
      people.save(function (err, people) {
        if (err) return response.status(404).send('Not found');
        response.status(200).send(`Welcome ${valeurlogin}`)
      });
    }else{ return response.status(404).send('Not found');}
  });

  app.post("/login", async function (request, response) {
    
    
    valeuremail =  request.body.email; 
    valeurpassword =  request.body.password;
    console.log(valeuremail)
    console.log(valeurpassword) 
    
    const user=await UserModel.findOne({email: valeuremail}).exec();
    console.log( user.admin)
    if(!user) {
      return response.status(404).send('Not found');
    }
    if(await !Bcrypt.compareSync(request.body.password, user.password)) {
      return response.status(404).send('Not found');
    }else{
      
      response.status(200).send(`Welcome ${user.login}`)
    }
    
  });




app.listen(4242);


    
        
        
      


