const mongoose = require('mongoose'),
      bluebird = require('bluebird'),
      bcrypt = bluebird.promisifyAll(require("bcrypt"));

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    updated_at: {type: Date, default: Date.now},
});

userSchema.pre('save', async (next) => {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const hash = await bcrypt.hashAsync(this.password, 16.5);
        this.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.passwordIsValid = (password) => {
   try {
       return bcrypt.compareAsync(password, this.password);
   }
   catch (err) {
       throw err;
   }
};

const User = mongoose.model('User', userSchema);
module.exports = User;