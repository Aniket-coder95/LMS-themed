
var mongoose = require('mongoose') ;
const plusdate = require('../plusdays')

var db = mongoose.Schema;
var schema = new db ({
   email : {
      type : 'String' ,
      require : 'true'
   },
   bookid : {
      type : 'String' ,
      require : 'true'
   },
   bookname : {
      type : 'String' ,
      require : 'true'
   },
   author : {
      type : 'String' ,
      require : 'true'
   },
   date: {
      type:'String',
      required:'true',
      default:new Date().toLocaleDateString()
    },
   returndate: {
      type:'String',
      required:'true',
      default: plusdate()
   },
   isblocked: {
      type:'Boolean',
      require:'true',
      default:false
   },
   
   
  
});

var booklist = mongoose.model('Borrowedbook',schema);
module.exports = booklist;

