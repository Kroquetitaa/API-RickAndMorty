const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { STATUS } = require('../../../utils/constants/STATUS');
const { GENDERS } = require('../../../utils/constants/STATUS');

const schema = new Schema(
    {
        id: { type: Number, required: true, unique: true, retainKeyOrder: true},
        name: { type: String },
        status: { type: String, enum: STATUS },
        species: { type: String },
        type: { type: String },
        gender: { type: String, enum: GENDERS },
        origin: { type: Schema.Types.ObjectId, ref: 'origins'},
        location: { type: Schema.Types.ObjectId, ref: 'location'},
        image: [{ type: Schema.Types.ObjectId, ref: 'image'}],
        episode: [{ type: Schema.Types.ObjectId, ref: 'episodes'}],
        url: { type: String },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model( 'characters', schema );