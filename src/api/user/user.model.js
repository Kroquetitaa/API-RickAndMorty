const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { setError } = require('../../utils/errors/error');
const { validationPassword } = require('../../utils/validations/validation');
const GENDERS = require('../../utils/constants/GENDERS');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        gender: { type: String, enum: GENDERS }
    }, 
    {
        timestamps: true,
    }
);

schema.pre( 'save', function(next) {
    if(!validationPassword( this.password )) return next(setError(400, 'INVALID PASSWORD'));
    this.password = bcrypt.hashSync( this.password, 16 );
    next();
});

module.exports = mongoose.model( 'users', schema );