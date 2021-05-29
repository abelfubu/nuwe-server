const express = require('express');
const router = express.Router();

const {
    createUser,
    getOneUser,
    getAllUsers,
    updateUser,
    deleteUser
} = require('../controllers/user.controller');

const { encrypt } = require('../middleware/encryptPassword');

// Ruta para crear un usuario
router.post('/', encrypt, createUser);

// Ruta para obtener todos los usuarios
router.get('/', getAllUsers);

// Ruta para obtener un usuario en base a su ID
router.get('/:userId', getOneUser);

// Ruta para actualizar los datos del usuario
router.put('/:userId', encrypt, updateUser);

// Ruta para eliminar a un usuario
router.delete('/:userId', deleteUser);

module.exports = router;