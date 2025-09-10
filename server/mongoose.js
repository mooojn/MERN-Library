import mongoose from "mongoose";
import { book } from "./models/book.js";

// const URI = 'mongodb://localhost:27017/Library';
const URI =
  "mongodb+srv://moojntariq_db_user:5H4oY48aZsjCTiSA@moon.yk5hjzg.mongodb.net/Library?retryWrites=true&w=majority&appName=moon";

// connect once
mongoose
  .connect(URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Connection error:", err));

export async function getBooks() {
  return await book.find();
}

export async function storeBook(json) {
  return await book.create({ title: json.title, author: json.author });
}

export async function updateBook(id, json) {
  return await book.findByIdAndUpdate(
    id,
    {
      title: json.title,
      author: json.author,
    },
    { new: true } // returns updated doc
  );
}

export async function deleteBook(id) {
  return await book.findByIdAndDelete(id);
}
