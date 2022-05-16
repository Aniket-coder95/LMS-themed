
var mongoose = require('mongoose') ;
var id = require('../uniqueId')
var db = mongoose.Schema;
var returnedBookSchema = new db ({
   id : {
      type : 'String' ,
      require : 'true',
      default : id()
   },
   email : {
      type : 'String' ,
      require : 'true'
   },
   bookId : {
      type : 'String' ,
      require : 'true'
   },
   issueDate: {
        type:'String',
        required:'true',
   },
   returnDate: {
      type:'String',
      required:'true',
      default:0
    },
    fine: {
        type:'Number',
        required:'true',
        default:0
    },
    isblocked: {
        type:'Boolean',
        require:'true',
        default:false 
    },
});

var booklist = mongoose.model('returnedBookDetail', returnedBookSchema);
module.exports = booklist;

