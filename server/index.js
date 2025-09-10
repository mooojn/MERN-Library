import express from "express";
import CORS from "cors";
import bookRoutes from "./routes/books.js";

const app = express();
app.use(CORS());
app.use(express.json());

// Home
app.get("/", (req, res) => {
  res.send("Running");
});

// Mount all /books routes
app.use("/books", bookRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log("Server running at port:", PORT));
