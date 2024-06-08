const mongoose = require("mongoose");
const {Schema} = mongoose;

const photoSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String,
},{
    timestamps: true
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;