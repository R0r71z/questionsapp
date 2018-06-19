const bluebird = require('bluebird');
const mongoose = require('mongoose');

mongoose.Promise = bluebird;

const connect = () => {
    mongoose.connect(process.env.DB_URI)
    .then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : ${process.env.DB_URI}`)})
    .catch((e)=> { console.log(e, `Error Connecting to the Mongodb Database at URL : ${process.env.DB_URI}`)});
};


exports.connect = connect;
