const mongoose = require('mongoose'),
      bluebird = require('bluebird'),
      bcrypt = bluebird.promisifyAll(require("bcrypt")),
      constants = require('../constants');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    updated_at: {type: Date, default: Date.now},
    session_id: {type: String, required: false, default: ''},
    logged_in: {type: Boolean, default: false}
});

userSchema.pre('save', async function(next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const hash = await bcrypt.hashAsync(`${this.password}/${constants.salt}`, 16.5);
        this.password = hash;
        next();
    } catch (err) {
        next(err);
    }
    next();
});

userSchema.methods.passwordIsValid = async function(password) {
   try {
       return await bcrypt.compareAsync(`${password}/${constants.salt}`, this.password);
   }
   catch (err) {
       throw err;
   }
};

const User = mongoose.model('User', userSchema);
module.exports = User;