


const date = ()=>{
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString()
  }
  
  module.exports = date;