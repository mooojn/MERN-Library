import express from "express";
import CORS from "cors";
import bookRoutes from "./routes/books.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
app.use(CORS());
app.use(express.json());

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book API",
      version: "1.0.0",
      description: "Simple API for managing books",
    },
    servers: [
      {
        url: "http://localhost:3000", // base URL
      },
    ],
  },
  apis: ["./routes/*.js"], // 👈 tells swagger-jsdoc where to find docs
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Home
app.get("/", (req, res) => {
  res.send("Running");
});

// Mount all /books routes
app.use("/books", bookRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log("Server running at port:", PORT));



import express from "express";
import { getBooks, storeBook, updateBook, deleteBook } from "../mongoose.js";

const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of books
 */
router.get("/", async (req, res) => {
  const books = await getBooks();
  res.json(books);
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book added
 */
router.post("/", async (req, res) => {
  const { title, author } = req.body;
  await storeBook({ title, author });
  res.json({ success: true });
});

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Book updated
 */
router.put("/:id", async (req, res) => {
  await updateBook(req.params.id, req.body);
  res.json({ success: true });
});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 */
router.delete("/:id", async (req, res) => {
  await deleteBook(req.params.id);
  res.json({ success: true });
});

export default router;
