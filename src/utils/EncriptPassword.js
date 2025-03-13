const bcrypt = require('bcrypt');
const hashPassword = async (password) => {

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

const comparePassword = (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
}

module.exports = {hashPassword, comparePassword}