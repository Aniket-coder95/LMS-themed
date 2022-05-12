


const generatePassword = ()=>{
//     const length = 8;
//   const charset =
//     "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let random_password = "";
//   for (var i = 0, n = charset.length; i < length; ++i) {
//     random_password += charset.charAt(Math.floor(Math.random() * n));
//   }
//   return random_password;

  return Math.random().toString(36).slice(2, 10)
}

module.exports = generatePassword;