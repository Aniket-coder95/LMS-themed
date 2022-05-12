
var mongoose = require('mongoose') ;

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
   // isborrowed:{
   //    type:'Boolean',
   //    require:'true',
   //    default:false 
   // },
   // total_borrowed:{
   //    type:"Number",
   //    require:"true",
   //    default:0 
   // },
   date: {
    type:'String',
    required:'true',
    default:Date()
    },
   isblocked: {
      type:'Boolean',
      require:'true',
      default:false
   },
   
   
  
});

var booklist = mongoose.model('Borrowedbook',schema);
module.exports = booklist;

