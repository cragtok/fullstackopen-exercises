const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Blog title required."],
        minlength: 5,
    },
    author: {
        type: String,
        required: [true, "Author name required."],
        minlength: 3,
    },
    url: {
        type: String,
        validate: {
            validator: function (v) {
                const pattern = new RegExp(
                    "^((ft|htt)ps?:\\/\\/)?" + // protocol
                        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
                        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
                        "(\\:\\d+)?" + // port
                        "(\\/[-a-z\\d%@_.~+&:]*)*" + // path
                        "(\\?[;&a-z\\d%@_.,~+&:=-]*)?" + // query string
                        "(\\#[-a-z\\d_]*)?$",
                    "i"
                ); // fragment locator
                return pattern.test(v);
            },
            message: props => `${props.value} is not a valid url.`,
        },
        required: [true, "Blog url required."],
    },
    likes: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comments: [{ type: "String" }],
});

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
