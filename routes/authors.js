const express = require('express')
const router = express.Router()
const Author = require('../models/author')
//All Authors Route
router.get('/',(req,res)=>{
  // res.send("Hello World")
  res.render('authors/index')
})

//New Authors Route
router.get('/new',(req,res)=>{
  // res.send("Hello World")
  res.render('authors/new',{author : new Author()})
})

//Create Author Route
router.post('/',(req,res)=>{
  res.send('Create')
})

module.exports=router