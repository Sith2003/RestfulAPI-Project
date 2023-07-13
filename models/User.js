import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 25,
        minlength: 3,
      },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        maxlength: 25
    }
});

const User = mongoose.model('User', UserSchema);

export default User;