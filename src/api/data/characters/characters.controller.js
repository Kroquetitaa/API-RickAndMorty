const Characters = require("./characters.model");
const { setError } = require("../../../utils/errors/error");
const { deleteFile } = require("../../../middleware/delete-file");

const getAllCharacters = async (req, res, next) => {
    try {
        const characters = await Characters.find().sort( {id: "ascending"}).populate('origin location image episode');
        return res.json({
        status: 200,
        message: "Recover all Characters",
        results: characters ,
        });
    } catch (error) {
        return next( setError( 500, error.message || 'Failed recovered all Characters!'));
    }
};

const createCharacter = async( req, res, next ) => {
    try {
        const newCharacter = new Characters( req.body );
        if( req.file ) newCharacter.image = req.file.path;
        const characterInDB = await newCharacter.save();
        return res.json({
            status: 201,
            message: 'Created character',
            results:  characterInDB ,
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed to created new Character!'));
    }
};

const getSingleCharacter = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const character = await Characters.find( { id: id });
        if( !character ) return next( setError(404, 'ID avatar not found'));
        return res.json({
            status: 200,
            message: 'Recovered Character by ID',
            results: character,
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed to recovered Character!'));
    }
}

const getMultipleCharacters = async( req, res, next ) => {
    try {
        const { id } = req.params;
        let multipleID = id.split(',');
        const multipleCharacter = await Characters.find( {id: multipleID} );
        if( !multipleCharacter ) return next( setError(404, 'Multiples ID not found'));
        return res.json({
            status: 200,
            message: 'Recovered multiple Character by ID',
            results: multipleCharacter,
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed to recovered multiple Character!'));
    }
}
const filter = async( req, res, next ) => {
    try {
        const values = req.query;
        const filterValues = await Characters.find( values );
        if( !filterValues ) return next( setError(404, 'Filter not found'));
        return res.json({
            status: 200,
            message: 'Recovered filter Character',
            results: filterValues,
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed to recovered filter Characters!'));
    }
}

const update = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const character = new Characters(req.body);
        character._id = id;
        const updateShopping = await Characters.findByIdAndUpdate( id, character );
        if( !updateShopping ) return next( setError(404, 'Character not found'));
        return res.json({
            status: 201,
            message: 'Character updated',
            data: { updateShopping },
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed to updated Character!'))
    }
}

const removeID = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const deletedID = await Characters.findOneAndDelete({ id: id });
        if( deletedID.image ) deleteFile( deletedID.image );
        if( !deletedID ) return next( setError(404, 'ID not found'));
        return res.json({
            status: 200,
            message: 'Deleted ID',
            data: { deletedID },
        })
    } catch (error) {
        return next( setError(500, error.message || 'Failed delete ID'));
    }
}

module.exports = { getAllCharacters, createCharacter, getSingleCharacter, getMultipleCharacters, filter, update, removeID };
