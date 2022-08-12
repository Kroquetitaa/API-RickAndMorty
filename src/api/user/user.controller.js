const User = require('./user.model');
const bcrypt = require('bcrypt');
const { createToken } = require('../../utils/tokens/token-action');
const { setError } = require('../../utils/errors/error');

const register = async( req, res, next ) =>{
    try {
        const newUser = new User( req.body );
        const emailExist = await User.findOne( { email: newUser.email } );
        const usernameExist = await User.findOne( { username: newUser.username } );
        if( emailExist || usernameExist ) return next( setError( 409, 'Username or Email already exist!'));
        const userInDB = await newUser.save();
        return res.json({
            status: 201,
            message: 'Created new User',
            data: { userInDB },
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Error to create a new User'));
    }
}

const login = async( req, res, next ) => {
    try {
        const userInDB = await User.findOne({ email: req.body.email });
        if( !userInDB ) return next( setError(404, 'User not found'));
        if( bcrypt.compareSync( req.body.password, userInDB.password )){
            const token = createToken( userInDB._id, userInDB.email );
            return res.status(200).json({ userInDB, token });
        } else {
            return next( setError( 401, 'Invalid Password'));
        }
    } catch (error) {
        return next( setError( 500, error.message || 'Unexpected error login!'));
    }
}

const getUserByUsername = async (req, res, next ) => {
    try {
        const { username } = req.params;
        if( username != req.user.username ) return next( setError( 403, 'Username not found'));
        const user = await User.find( { username: username } );
        if( !user ) return next( setError(404, 'User not found') );
        return res.json({
            status: 200,
            message: 'Username founding',
            data: { user },
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Unexpected error!'));
    }
}

const getUserByEmail = async (req, res, next ) => {
    try {
        const { email } = req.params;
        if( email != req.user.email ) return next( setError( 403, 'Email not found'));
        const user = await User.find( { email: email } );
        if( !user ) return next( setError(404, 'User not found') );
        return res.json({
            status: 200,
            message: 'Email founding',
            data: { user },
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Unexpected error!'));
    }
}

const updatedUser = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const user = new User(req.body);
        user._id = id;
        const updatedUser = await User.findByIdAndUpdate( id, user );
        if (!updatedUser) return next(setError(404, 'User not found'));
        return res.json({
            status: 201,
            message: 'Updated User',
            data: { updatedUser }
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed update user!'));
    }
}

const remove = async( req, res, next ) => {
    try {
        const { email, username } = req.params;
        const deletedUser = await User.findOneAndDelete( email, username );
        if( !deletedUser ) return next( setError( 404, 'Email or Username not found'));
        return res.json({
            status: 200,
            message: 'Deleted user',
            data: { deletedUser }
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed remove user!'));
    }
}

module.exports = { register, login, getUserByUsername, getUserByEmail, updatedUser, remove };