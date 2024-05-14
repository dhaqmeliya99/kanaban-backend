const mongoose = require('mongoose');

const staredSchema = mongoose.Schema({
    taskListId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "taskList"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    stared: {
        type: String,
        default:"0" // 0 Non stared and 1 stared yes
    },
}, {
    timestamps: true
}, {
    collection: "stared"
})

module.exports = mongoose.model("stared", staredSchema);