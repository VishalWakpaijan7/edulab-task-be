const axios = require('axios');
const CustomError = require('../utils/customerror');

const generateRandomUsers = async () => {
    const URL = 'https://api.github.com/users';
    let result;
    try {
        result = await axios.get(URL);
    } catch (err) {
        throw new CustomError(err);
    }
    return result
};
module.exports = generateRandomUsers