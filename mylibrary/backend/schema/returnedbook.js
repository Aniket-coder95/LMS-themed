
var mongoose = require('mongoose') ;

var db = mongoose.Schema;
var returnedBookSchema = new db ({
   studentId : {
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
      default:new Date().toLocaleDateString()
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

