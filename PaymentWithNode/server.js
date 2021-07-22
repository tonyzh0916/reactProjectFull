if(process.env.NODE_ENV !=='production'){
  require('dotenv').config({path:'./.env'})
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
console.log(stripeSecretKey);
const express = require('express');
const app = express();
const fs = require('fs');
const stripe = require('stripe')(stripeSecretKey)

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

app.get('/store', function(req, res){
  fs.readFile('items.json', function(error, data){
    if(error){
      res.status(500).end();
    }else{
      res.render('store.ejs',{
        stripePublicKey:stripePublicKey,
        items:JSON.parse(data)
      })
    }
  })
})

app.post('/purchase', function(req, res){
  fs.readFile('items.json', function(error, data){
    if(error){
      res.status(500).end();
    }else{
      const itmesJson = JSON.parse(data);
      const intemsArray = itmesJson.music.concat(itmesJson.merch);
      let total = 0;
      req.body.itmes.forEach(function(itme){
        const itemJson = itmesArray.find(function(i){
          return i.id == itme.id
        })
        total = total+itemJson.price*itme.quantity;
      })
        stripe.charges.create({
          amount:total,
          source:req.body.stripeTokenId,
          currency:'usd'
        }).then(function(){
          console.log("change successful");
          res.json({message:'Successfully purchased items'})
        }).catch(function(){
          res.status(500).end()
        })
    }
  })
})

app.listen(3000);