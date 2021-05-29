const User = require('../models/user.model');
const { errorHandler } = require('../helpers/dbErrorHandler');

/**
 * Recibe información de un usuario y lo registra en la base de datos
 * @param {Object} req 
 * @param {Object} res 
 */
exports.createUser = async (req, res) => {

    let user = new User(req.body);

    await user.save((err, user) => {
        if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
        }

        user.password = undefined;

        res.json(user);
    });
}

/**
 * Obtiene al usuario de la base de datos a partir de su ID
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getOneUser = async (req, res) => {
    let {userId} = req.params;

    await User.findById(userId, '-password').exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
              error: 'User not found',
            });
        }

        res.json(user);
    })
    
}

/**
 * Devuelve una lista completa de todos los usuarios
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getAllUsers = async (req, res) => {

    await User.find({}, '-password').exec((err, users) => {
        if (err) {
            return res.status(400).json({
              error: 'Something went wrong',
            });
        }

        if (users.length == 0) {
            res.json({message: 'No users were found here'})
        } else {
            res.json(users);
        }
    });
}

/**
 * Obtiene la información del formulario y la actualiza al encontrar al usuario mediante su ID
 * @param {Object} req 
 * @param {Object} res 
 */
exports.updateUser = async (req, res) => {
    let {userId} = req.params;

    await User.findOneAndUpdate(
        {_id: userId}, 
        {$set: req.body}, 
        {new: true, select: '-password'}, 
        (err, user) => {
        if (err || !user) {
            return res.status(400).json({
              error: "User couldn't be updated",
            });
        }

        res.json(user);
    })
    
}

/**
 * Encuentra a un usuario en base a su ID y lo elimina de la base de datos
 * @param {Object} req 
 * @param {Object} res 
 */
exports.deleteUser = async (req, res) => {
    let { userId } = req.params;

    await User.findByIdAndDelete({_id: userId}, '-password', (err, user) => {
        if (err || !user) {
            return res.status(400).json({
              error: "User couldn't be deleted",
            });
        }

        res.json({message: 'User succesfully deleted', user});
    })
    
}
