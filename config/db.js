const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use the correct MongoDB connection string
        const conn = await mongoose.connect('mongodb+srv://sureshkumarsuresh88407:suresh@cluster0.7vsce.mongodb.net/CartDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Log the host of the connected database
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit the process with a failure code
    }
};

module.exports = connectDB;