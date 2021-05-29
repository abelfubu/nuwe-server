const bcrypt = require('bcrypt');

exports.encrypt = (req, res, next) => {
    let { password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);

    next();
}