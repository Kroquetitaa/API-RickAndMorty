const Images = require('./image.model');
const { setError } = require('../../../../utils/errors/error');

const createImage = async( req, res, next ) => {
    try {
        const image = new Images( req.body );
        const imageInDB = await image.save();
        return res.json({
            status: 200,
            message: 'Image created',
            results: { imageInDB },
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed create image!'));
    }
};

const getAllImages = async ( req, res, next ) => {
    try {
        const images = await Images.find();
        return res.json({
            status: 200,
            message: 'All images',
            results: { images },
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed search all images!'));
    }
}

const getSingleImage = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const image = await Images.findOne( { id: id });
        if( !image ) return next( setError(404, 'ID image not found'));
        return res.json({
            status: 200,
            message: 'Recovered image by ID',
            results: image,
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed to recovered image!'));
    }
}

const update = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const image = new Images( req.body );
        image._id = id;
        const updateImage = await Location.findByIdAndUpdate( id, image );
        if( !updateImage ) return next( setError(404, 'Image not found'));
        return res.json({
            status: 201,
            message: 'Image updated',
            data: { updateImage },
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed to updated image!'))
    }
}

const removeImageID = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const deletedImageID = await Images.findOneAndDelete({ id: id });
        // if( deletedID.image ) deleteFile( deletedID.image );
        if( !deletedImageID ) return next( setError(404, 'ID image not found'));
        return res.json({
            status: 200,
            message: 'Deleted image',
            data: { deletedImageID },
        })
    } catch (error) {
        return next( setError(500, error.message || 'Failed delete ID image'));
    }
}


module.exports = { createImage, getAllImages, getSingleImage, update, removeImageID };