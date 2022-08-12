const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        image: { type: String },
    }
)

module.exports = mongoose.model( 'image', schema );