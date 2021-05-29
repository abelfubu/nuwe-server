const express = require('express');
const router = express.Router();

// Importamos los métodos creados en el controlador
const {
    createRepo,
    getAllRepos,
    getReposFromUser,
    getOneRepo,
    updateRepo,
    deleteRepo
} = require('../controllers/repository.controller');

// Ruta para crear un repositorio para un usuario
router.post('/:userId', createRepo);

// Ruta para obtener todos los repositorios
router.get('/', getAllRepos);

// Ruta para obtener todos los repositorios de un usuario
router.get('/getRepoByUser/:userId', getReposFromUser);

// Ruta para obtener un repositorio
router.get('/getRepo/:repoId', getOneRepo);

// Ruta para actualizar un repositorio
router.put('/:repoId', updateRepo);

// Ruta para eliminar un repositorio
router.delete('/:repoId', deleteRepo);


module.exports = router;