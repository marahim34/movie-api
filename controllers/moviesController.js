import { ObjectId } from "mongodb";
import { getMoviesCollection } from "../config/dbConfig.js";

// Get all the movies
export const getMovies = async (req, res) => {
  const moviesCollection = getMoviesCollection();
  const { title, director, year } = req.query;

  const query = {};

  if (title) query.title = { $regex: title, $options: "i" };
  if (director) query.director = { $regex: director, $options: "i" };

  if (year) {
    const y = Number(year);
    if (!Number.isInteger(y)) {
      return res.status(400).json({ error: "year must be an integer in query" });
    }
    query.year = y;
  }

  try {
    const result = await moviesCollection.find(query).toArray();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in GET /movies:", error);
    return res.status(500).json({ error: "Database error" });
  }
};


// Get a single movie
export const getMovieById = async (req, res) => {
  const moviesCollection = getMoviesCollection();
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id (must be an ObjectId)" });
  }

  try {
    const movie = await moviesCollection.findOne({ _id: new ObjectId(id) });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res.json(movie);
  } catch (error) {
    console.error("Error in GET /movies/:id:", error);
    return res.status(500).json({ error: "Database error" });
  }
};


// Create movie
export const createMovie = async (req, res) => {
  const moviesCollection = getMoviesCollection();
  const { title, director, year } = req.body;

  const newMovie = { title, director, year };

  try {
    const result = await moviesCollection.insertOne(newMovie);
    return res
      .status(201)
      .location(`/movies/${result.insertedId}`)
      .json({ ...newMovie, _id: result.insertedId });
  } catch (error) {
    console.error("Error in POST /movies:", error);
    return res.status(500).json({ error: "Database error" });
  }
};


// Update movie
export const updateMovie = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Bad Request: id must be an ObjectId" });
  }

  const moviesCollection = getMoviesCollection();
  const { title, director, year } = req.body;

  try {
    const updated = await moviesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { title, director, year } },
      { returnDocument: "after" } 
    );

    if (!updated) {
      return res.status(404).json({ error: "Not Found: movie does not exist" });
    }

    return res.json(updated);

  } catch (error) {
    console.error("Error in PUT /movies/:id:", error);
    return res.status(500).json({ error: "Database error" });
  }
};



// Delete movie
export const deleteMovie = async (req, res) => {
  const moviesCollection = getMoviesCollection();
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id (must be an ObjectId)" });
  }

  try {
    const result = await moviesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Id not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error in DELETE /movies/:id:", error);
    return res.status(500).json({ error: "Database error" });
  }
};
