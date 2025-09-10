import express from "express";
import CORS from "cors";
import bookRoutes from "./routes/books.js";

const app = express();
app.use(CORS());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running");
});

app.use("/books", bookRoutes);

// export default app;

app.listen(3000)
