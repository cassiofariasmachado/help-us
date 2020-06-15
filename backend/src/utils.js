const jwt = require('jsonwebtoken');


const getLoggedUser = (authorization) => {
    if (!authorization)
        return null;

    const token = authorization.split(' ')[1];

    return jwt.decode(token);
}


module.exports = { getLoggedUser }