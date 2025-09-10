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