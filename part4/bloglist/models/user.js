const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required."],
        minLength: [3, "Username must be at least 3 characters long."],
    },
    passwordHash: {
        type: String,
        required: [true, "Password is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required."],
    },
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
