
var mongoose = require('mongoose') ;

var db = mongoose.Schema;
var schema = new db ({
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
   total_books:{
      type : 'number' ,
      require : 'true'
   },
   available_books:{
      type : 'number',
      require:'true'
   },
   isblocked: {
      type:'Boolean',
      require:'true',
      default:false
   }
   
  
});

var booklist = mongoose.model('allbooks',schema);
module.exports = booklist;

