const UsersRoutes = require('express').Router();
const rateLimit = require('express-rate-limit');
const {authorize} = require('../../middleware/auth');
const {register, login, getUserByUsername, getUserByEmail, updatedUser, remove } = require('./user.controller');

const userCreateRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
});

UsersRoutes.post('/register', [userCreateRateLimit], register );
UsersRoutes.post('/login', login );
UsersRoutes.get('/username/:username', [authorize], getUserByUsername );
UsersRoutes.get('/email/:email', [authorize], getUserByEmail );
UsersRoutes.patch('/update/:id', [authorize], updatedUser );
UsersRoutes.delete('/remove/:email' || '/remove/:username', [authorize], remove );

module.exports = UsersRoutes;