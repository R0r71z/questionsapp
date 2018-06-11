const bluebird = require('bluebird');
const mongoose = require('mongoose');
const constants = require('./constants');

mongoose.Promise = bluebird;

const connect = () => {
    mongoose.connect(constants.mongoURI)
    .then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : ${constants.mongoURI}`)})
    .catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : ${constants.mongoURI}`)});
};


module.exports = {
    connect
};
