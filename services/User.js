const User = require('../models/User');
const error = require('../helper').error;

exports.getUser = async (query) => {
    try {
        return await User.findOne(query);
    } catch(e) {
        error('Failed to fetch User.');
    }
};

exports.createUser = (userObj) => {
    const newUser = new User({
        username: userObj.username,
        password: userObj.password,
        session_id: userObj.session_id
    });

    try {
        return await newUser.save();
    } catch(e) {
        error('Failed to create User.');
    }
};

exports.updateUser = (userObj) => {
    const oldUser = User.findById(userObj.id);
    if (!oldUser) return false;

    oldUser.username = userObj.username;
    oldUser.password = userObj.password;
    oldUser.updated_at = new Date();
    
    try {
        return await oldUser.save();
    } catch(e) {
        error('Failed to update User.');
    }
}

exports.deleteUser = async (id) => {
    try {
        const deleted = await User.remove({_id: id});
        if (deleted.n === 0) {
            return error('User object could not be deleted');
        }
        return deleted;
    } catch(e) {
        error(e.message);
    }
}