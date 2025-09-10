import mongoose, { version } from "mongoose"

const bookSchema = new mongoose.Schema(
    {
        title: String,
        author: String,
    },
    { versionKey:false }
)

export const book = mongoose.model('book', bookSchema)