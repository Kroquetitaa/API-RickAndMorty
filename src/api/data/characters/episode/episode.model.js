const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema(
    {
       episode: { type: String }
    }
)

module.exports = mongoose.model( 'episodes', schema );