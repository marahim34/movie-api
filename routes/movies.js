import { Router } from "express";
import { 
    getMovies, 
    getMovieById, 
    createMovie, 
    updateMovie, 
    deleteMovie 
} from "../controllers/moviesController.js";
import { validateMovie } from "../middleware/validateMovie.js";
import { logger } from "../middleware/logger.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

// Create router
const moviesRouter = Router();

// Defining endpoints
moviesRouter.get("/", logger, getMovies)
moviesRouter.get("/:id", logger, getMovieById)
moviesRouter.post("/", authenticateToken, validateMovie, createMovie)
moviesRouter.put("/:id", authenticateToken, validateMovie, updateMovie)
moviesRouter.delete("/:id", authenticateToken, deleteMovie)


export default moviesRouter;