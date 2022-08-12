const Episodes = require('./episode.model'); 
const { setError } = require('../../../../utils/errors/error');

const createEpisode = async( req, res, next ) => {
    try {
        const episode = new Episodes( req.body );
        const episodeInDB = await episode.save();
        return res.json({
            status: 200,
            message: 'Episode created',
            results: { episodeInDB },
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed create episode!'));
    }
};

const getAllEpisodes = async ( req, res, next ) => {
    try {
        const episodes = await Episodes.find();
        return res.json({
            status: 200,
            message: 'All espisodes',
            results: { episodes },
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed search all episodes!'));
    }
}

const getSingleEpisode = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const episode = await Episodes.findOne( { id: id });
        if( !episode ) return next( setError(404, 'ID episode not found'));
        return res.json({
            status: 200,
            message: 'Recovered image by ID',
            results: episode,
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed to recovered episode!'));
    }
}

const update = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const episode = new Episodes( req.body );
        episode._id = id;
        const updateEpisode = await Episodes.findByIdAndUpdate( id, episode );
        if( !updateEpisode ) return next( setError(404, 'Episode not found'));
        return res.json({
            status: 201,
            message: 'Episode updated',
            data: { updateEpisode },
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed to updated episode!'))
    }
}

const removeEpisodeID = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const deletedEpisodeID = await Episodes.findOneAndDelete({ id: id });
        // if( deletedID.image ) deleteFile( deletedID.image );
        if( !deletedEpisodeID ) return next( setError(404, 'ID episode not found'));
        return res.json({
            status: 200,
            message: 'Deleted episode',
            data: { deletedEpisodeID },
        })
    } catch (error) {
        return next( setError(500, error.message || 'Failed delete ID episode'));
    }
}


module.exports = { createEpisode, getAllEpisodes, getSingleEpisode, update, removeEpisodeID };