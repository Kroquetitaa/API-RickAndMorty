const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { connect } = require('./utils/database/db');
const { setUpCloudinary } = require('./utils/cloudinary/cloudinary');

const UsersRoutes = require('./api/user/user.routes');
const CharactersRoutes = require('./api/data/characters/characters.routes');
const OriginRoutes = require('./api/data/characters/origin/origin.routes');
const LocationRoutes = require('./api/data/characters/location/location.routes');
const ImagesRoutes = require('./api/data/characters/image/image.routes');
const EpisodeRoutes = require('./api/data/characters/episode/episode.routes');

connect();
setUpCloudinary();

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());


const PORT = process.env.PORT || 8080;

app.use('/api/v1/', UsersRoutes );
app.use('/api', CharactersRoutes );
app.use('/api', OriginRoutes );
app.use('/api', LocationRoutes );
app.use('/api', ImagesRoutes );
app.use('/api', EpisodeRoutes );

app.listen(PORT, () => {
    console.log(`Server listening on port 🙈: ${PORT}`)
});

app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});


app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});