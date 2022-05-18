const bcrypt = require('bcrypt');
// console.log(user, password);
const encrypt = (myPlaintextPassword,saltRounds=10) => {
    const salt =bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    return hash
}
module.exports = encrypt;