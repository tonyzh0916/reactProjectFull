if(process.env.NODE_ENV!=='production'){
  require('dotenv').config();
}

constDARKSKY_API_KEY = process.env.DARKSKY_API_KEY;
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('wearther', (req,res)=>{

})

app.listen(3000, ()=>{
  console.log('the server started');
})