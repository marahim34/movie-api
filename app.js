import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import moviesRouter from "./routes/movies.js";
import { initDatabase } from "./config/dbConfig.js";
import authenticationRouter from "./routes/authentication.js"
// Loading .env
dotenv.config();

// Initalizing database
await initDatabase();

// Starting the server
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/movies", moviesRouter);
app.use("/auth", authenticationRouter)

app.use((req, res) => {
  res.status(404).json({ error: "Not Found: route does not exist" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
