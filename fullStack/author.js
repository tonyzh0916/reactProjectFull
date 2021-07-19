const mongoose = require('mongoose')

const authorZschema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model('Author',authorZschema)