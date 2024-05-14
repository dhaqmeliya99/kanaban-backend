const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    googleid: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: false
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    provider: {
        type: String,
        default: "google"
    }
}, {
    timestamps: true
}, {
    collection: "user"
})

module.exports = mongoose.model("user", userSchema);