const EpisodeRoutes = require('express').Router();
const { createEpisode, getAllEpisodes, getSingleEpisode, update, removeEpisodeID } = require('./episode.controller');

EpisodeRoutes.post('/createEpisode', createEpisode );
EpisodeRoutes.get('/getAllEpisodes', getAllEpisodes );
EpisodeRoutes.get('/getSingleEpisode/:id', getSingleEpisode );
EpisodeRoutes.patch('/update/:id', update );
EpisodeRoutes.delete('/removeEpisode/:id', removeEpisodeID );

module.exports = EpisodeRoutes;