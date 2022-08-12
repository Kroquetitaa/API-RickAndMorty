const Location = require("./location.model");
const { setError } = require("../../../../utils/errors/error");
// const { deleteFile } = require("../../../middleware/delete-file");

const getAllLocation = async (req, res, next) => {
    try {
        const location = await Location.find();
        return res.json({
        status: 200,
        message: "Recover all location",
        results: location ,
        });
    } catch (error) {
        return next( setError( 500, error.message || 'Failed recovered all location!'));
    }
};

const createLocation= async( req, res, next ) => {
    try {
        const newLocation = new Location( req.body );
        // if( req.file ) newCharacter.image = req.file.path;
        const locationInDB = await newLocation.save();
        return res.json({
            status: 201,
            message: 'Created location',
            results:  locationInDB ,
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed to created new location!'));
    }
};

const getSingleLocation = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const location = await Location.findOne( { id: id });
        if( !location ) return next( setError(404, 'ID location not found'));
        return res.json({
            status: 200,
            message: 'Recovered location by ID',
            results: location,
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed to recovered location!'));
    }
}

const update = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const location = new Location(req.body);
        location._id = id;
        const updateLocation = await Location.findByIdAndUpdate( id, location );
        if( !updateLocation ) return next( setError(404, 'Location not found'));
        return res.json({
            status: 201,
            message: 'Location updated',
            data: { updateLocation },
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed to updated location!'))
    }
}

const removeLocationID = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const deletedLocationID = await Location.findOneAndDelete({ id: id });
        // if( deletedID.image ) deleteFile( deletedID.image );
        if( !deletedLocationID ) return next( setError(404, 'ID location not found'));
        return res.json({
            status: 200,
            message: 'Deleted ID',
            data: { deletedLocationID },
        })
    } catch (error) {
        return next( setError(500, error.message || 'Failed delete ID location'));
    }
}

module.exports = { getAllLocation, createLocation, getSingleLocation, update, removeLocationID };
