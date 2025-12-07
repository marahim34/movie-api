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

// Create router
const moviesRouter = Router();

// Defining endpoints
moviesRouter.get("/", logger, getMovies)
moviesRouter.get("/:id", logger, getMovieById)
moviesRouter.post("/", logger, validateMovie, createMovie)
moviesRouter.put("/:id", logger, validateMovie, updateMovie)
moviesRouter.delete("/:id", logger, deleteMovie)


export default moviesRouter;