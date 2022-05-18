const bcrypt = require('bcrypt');
// console.log(user, password);
const decrypt = (myPlaintextPassword,encrypted) => {
    return bcrypt.compareSync(myPlaintextPassword, encrypted )
}
module.exports = decrypt;