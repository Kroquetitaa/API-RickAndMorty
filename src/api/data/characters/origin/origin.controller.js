const Origin = require("./origin.model");
const { setError } = require("../../../../utils/errors/error");
// const { deleteFile } = require("../../../middleware/delete-file");

const getAllOrigin = async (req, res, next) => {
    try {
        const origin = await Origin.find();
        return res.json({
        status: 200,
        message: "Recover all origin",
        results: origin ,
        });
    } catch (error) {
        return next( setError( 500, error.message || 'Failed recovered all origins!'));
    }
};

const createOrigin = async( req, res, next ) => {
    try {
        const newOrigin = new Origin( req.body );
        // if( req.file ) newCharacter.image = req.file.path;
        const originInDB = await newOrigin.save();
        return res.json({
            status: 201,
            message: 'Created origin',
            results:  originInDB ,
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed to created new origin!'));
    }
};

const getSingleOrigin = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const origin = await Origin.find( { id: id });
        if( !origin ) return next( setError(404, 'ID origin not found'));
        return res.json({
            status: 200,
            message: 'Recovered Origin by ID',
            results: origin,
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed to recovered origin!'));
    }
}

const update = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const origin = new Origin(req.body);
        origin._id = id;
        const updateOrigin = await Origin.findByIdAndUpdate( id, origin );
        if( !updateOrigin ) return next( setError(404, 'Origin not found'));
        return res.json({
            status: 201,
            message: 'Origin updated',
            data: { updateOrigin },
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed to updated origin!'))
    }
}

const removeOriginID = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const deletedOriginID = await Origin.findOneAndDelete({ id: id });
        // if( deletedID.image ) deleteFile( deletedID.image );
        if( !deletedOriginID ) return next( setError(404, 'ID origin not found'));
        return res.json({
            status: 200,
            message: 'Deleted ID',
            data: { deletedOriginID },
        })
    } catch (error) {
        return next( setError(500, error.message || 'Failed delete ID origin'));
    }
}

module.exports = { getAllOrigin, createOrigin, getSingleOrigin, update, removeOriginID };
