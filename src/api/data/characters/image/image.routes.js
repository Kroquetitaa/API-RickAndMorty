const ImagesRoutes = require('express').Router();
const { createImage, getAllImages, getSingleImage, update, removeImageID } = require('./image.controller');

ImagesRoutes.post('/createImage', createImage );
ImagesRoutes.get('/getAll', getAllImages );
ImagesRoutes.get('/getSingleImage/:id', getSingleImage );
ImagesRoutes.patch('/update/:id', update );
ImagesRoutes.delete('/removeImage/:id', removeImageID );

module.exports = ImagesRoutes;