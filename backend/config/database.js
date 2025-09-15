const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

// Initialize the auto-increment plugin with the Mongoose connection
autoIncrement.initialize(mongoose.connection);
const connectDatabase = () => {
    // DB_LOCAL_URI
    mongoose.connect("mongodb://127.0.0.1:27017/myLocalDatabase",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase;