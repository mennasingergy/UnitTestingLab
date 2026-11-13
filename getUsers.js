
require('dotenv').config();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    name: String
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

const getUsers = async () => {
    if (mongoose.connection.readyState !== 1) {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not configured');
        }

        await mongoose.connect(process.env.MONGODB_URI);
    }

    return User.find({}, { _id: 0, id: 1, name: 1 }).lean();
};

module.exports = getUsers;
