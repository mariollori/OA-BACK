const jwt = require('jsonwebtoken');
const secret = "ex4m3n-p4r614l-3";

module.exports = {
    checkToken: (req, res, next) => {
        const tokenaccess = req.header('authorization');
      
        if (typeof tokenaccess !== 'undefined') {
           
         
            const token = tokenaccess;
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        success: 0,
                        message: "token invalido"
                    });
                } else {
                    next();
                }
            });
        } else {
            res.status(401).json({
                success: 0,
                message: "Acceso denegado no arutorizado "
            });
        }
    }
}