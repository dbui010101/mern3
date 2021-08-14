const mongoose = require('mongoose');
const Bcrypt = require("bcryptjs");
const saltRounds = 10;
var express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extend: true }));

mongoose.connect('mongodb://127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, autoIndex: true}) 
  const produitSchema = new mongoose.Schema({
    titre: { type: String,index: true, unique: true, minLength: 5, maxLength: 20 },
    prix: { type: Number,index: true, unique: true },
    description: { type: String }
  });
  

  const pro = mongoose.model('produit', produitSchema);
  
  
  app.post("/admin/add", async function (request, response) {

     valeurtitre =  request.body.titre; 
     valeurprix =  request.body.prix; 
     valeurdescription =  request.body.description; 
    
    
    if(valeurtitre && valeurprix && valeurdescription){
     
      const article = new pro({ 
        titre: valeurtitre,
        prix: valeurprix,
        description:  valeurdescription
      });
      
      
      article.save(function (err, article) {
        if (err) return response.status(404).send('Not found');
        response.status(200).send(`article cree`)
      });
    }else{ return response.status(404).send('Not found');}
  });

  
    





app.listen(4242);

