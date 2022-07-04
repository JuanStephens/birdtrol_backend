const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: {
            type: "String",
            required: true
        },
        userName: {
            type: "String",
            required: true
        },
        verified: {
            type: "Boolean",
            required: true
        },
        text: "String",
        // timestamp: Date.now(),
        avatar: "String",
        imagePost: "String",
    }, {
        timestamps: true
    });

module.exports = model('Post', userSchema);