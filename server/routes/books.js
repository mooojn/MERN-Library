import express from "express";
import { getBooks, storeBook, updateBook, deleteBook } from "../mongoose.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const books = await getBooks();
  res.json(books);
});

router.post("/", async (req, res) => {
  const { title, author } = req.body;
  await storeBook({ title, author });
  res.json({ success: true });
});

router.put("/:id", async (req, res) => {
  await updateBook(req.params.id, req.body);
  res.json({ success: true });
});

router.delete("/:id", async (req, res) => {
  await deleteBook(req.params.id);
  res.json({ success: true });
});

export default router;
