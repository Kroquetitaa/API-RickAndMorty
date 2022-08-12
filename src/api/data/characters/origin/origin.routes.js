const OriginRoutes = require('express').Router();
const{ getAllOrigin, createOrigin, getSingleOrigin, update, removeOriginID } = require('./origin.controller');
// const upload = require('../../../middleware/file');
// const { authorize } = require('../../../middleware/auth');
const rateLimit = require('express-rate-limit');

const originCreateRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
});

OriginRoutes.post( '/CreateOrigin', [originCreateRateLimit], createOrigin );
OriginRoutes.get( '/origin',  getAllOrigin );
OriginRoutes.get( '/origin/:id',  getSingleOrigin );
OriginRoutes.patch( '/updateOrigin/:id' ,  update );
OriginRoutes.delete( '/removeOrigin/:id' , removeOriginID );

module.exports = OriginRoutes;