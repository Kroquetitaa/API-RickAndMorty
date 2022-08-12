const CharactersRoutes = require('express').Router();
const { getAllCharacters, createCharacter, getSingleCharacter, getMultipleCharacters, filter, update,removeID} = require('./characters.controller');
const upload = require('../../../middleware/file');
const { authorize } = require('../../../middleware/auth');
const rateLimit = require('express-rate-limit');

const characterCreateRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
});

CharactersRoutes.post( '/createCharacter', [authorize, characterCreateRateLimit] ,upload.single('image'), createCharacter );
CharactersRoutes.get( '/character', getAllCharacters );
CharactersRoutes.get( '/character/:id', [authorize], getSingleCharacter );
CharactersRoutes.get( '/multipleCharacter/:id', [authorize], getMultipleCharacters );
CharactersRoutes.get( '/filter' , [authorize], filter );
CharactersRoutes.patch( '/update/:id' , [authorize], update );
CharactersRoutes.delete( '/remove/:id' , [authorize], removeID );

module.exports = CharactersRoutes;