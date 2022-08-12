const LocationRoutes = require('express').Router();
const { getAllLocation, createLocation, getSingleLocation, update, removeLocationID } = require('./location.controller');
// const upload = require('../../../middleware/file');
// const { authorize } = require('../../../middleware/auth');
const rateLimit = require('express-rate-limit');

const originLocationRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
});

LocationRoutes.post( '/createLocation', [originLocationRateLimit], createLocation );
LocationRoutes.get( '/location',  getAllLocation );
LocationRoutes.get( '/location/:id',  getSingleLocation );
LocationRoutes.patch( '/updateLocation/:id' ,  update );
LocationRoutes.delete( '/removeLocation/:id' , removeLocationID );

module.exports = LocationRoutes;