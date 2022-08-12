const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema(
    {
        name: { type: String },
        url: { type: String },
    }
)

module.exports = mongoose.model( 'location', schema );