const jwt = require('jsonwebtoken');
const {Users} = require('../models/Users');

const verifyToken = function(req, res, next) {
    let token = req.headers.authorization;

    if(token) {
        token = token.replace('Bearer ', '')

        jwt.verify(token, 'aijaz', async (err, decode) => {
            if (err) {
                res.send({message: 'Invalid Authorization',err})
            } else {
                console.log('decode ===>', decode);
                const tokenExist = await Users.findOne({_id: decode._id, token});
                if(tokenExist) {
                    next();
                } else {
                    res.send({message: 'Invalid Authorization'})
                }
            }
        })
    } else {
        res.send({message: 'Invalid Authorization'})
    }
    
}

module.exports = verifyToken;