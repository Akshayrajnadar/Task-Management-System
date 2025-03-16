const bcrypt = require('bcrypt');
const hashPassword = async (password) => {
    if (!password) throw new Error("Password is required for hashing");

    const bcrypt = require("bcrypt");
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};


const comparePassword =(password, hashPassword)=>{
    return bcrypt.compare(password, hashPassword);
}

module.exports = {hashPassword, comparePassword}