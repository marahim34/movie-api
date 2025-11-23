const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


const movies = [ 
    { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 }, 
    { id: 2, title: "The Matrix", director: "The Wachowskis", year: 1999 }, 
    { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019 } 
];

// Default route: return all movies as HTML list
app.get("/", (req, res) => {

    const items = movies.map(m => `<li><strong>${m.title}</strong> (${m.year}) - ${m.director} </li>`).join("");
    const html = `<!doctype html>
        <html lang="en">
        <head>
        <meta charset="utf-8" />
        <title>Movies</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style>
            body { font-family: system-ui, Arial, sans-serif; margin: 2rem; }
            h1 { margin-bottom: 0.5rem; }
            ul { line-height: 1.6; }
        </style>
        </head>
        <body>
        <h1>Movie List</h1>
        <ul>${items}</ul>
        </body>
        </html>`;
    res.type("html").send(html);

})

app.get("/movies", (req, res) => {
    const {title, director, year} = req.query;

    let result = [...movies];

    if(title){
        const tLowercase = title.toLowerCase()
        result = result.filter(m => m.title.toLowerCase().includes(tLowercase))
    }

    if(director){
        const dLowercase = director.toLowerCase();
        result = result.filter(m => m.director.toLowerCase().includes(dLowercase));
    }

    if (year) {
        const y = Number(year);
        if (!Number.isInteger(y)) {
            return res.status(400).json({ error: "year must be an integer in query" });
        }
        result = result.filter(m => m.year === y);
    }

    return res.status(200).json(result);
});

app.post("/movies", (req, res) => {
    const {title, director, year} = req.body || {};
    const y = Number(year);
    if(!title || !director || !Number.isInteger(y)){
        return res.status(400).json({
            error: "Invalid body. Expected { title, director, year:int } with Content-Type: application/json"
        })
    }
    const currentYear = new Date().getFullYear();
    if(y < 1888 || y > currentYear){
        return res.status(400).json({error: "Invalid date"})
    }
    const nextId = movies.length ? Math.max(...movies.map(m => m.id)) + 1 : 1
    const newMovie = {
        id: nextId,
        title,
        director, 
        year: y
    }
    movies.push(newMovie);
    console.log(`new movie: ${newMovie.title} added`)
    res.status(201).location(`/movies/${newMovie.id}`).json(newMovie);
})

// Get a movie
app.get("/movies/:id", (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id)){
        return res.status(400).json({error: "Invalid id (must be an integer)"})
    }

    const movie = movies.find(m => m.id === id);
    if(!movie){
        return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
})

// Update a movie
app.put("/movies/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Bad Request: id must be an integer" });
    }

    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
        return res.status(404).json({ error: "Not Found: movie does not exist" });
    }

    const { title, director, year } = req.body || {};
    const y = Number(year);

    if (!title || !director || !Number.isInteger(y)) {
        return res.status(400).json({
            error: "Bad Request: title, director and year (integer) are required"
        });
    }

    const currentYear = new Date().getFullYear();
    if (y < 1888 || y > currentYear) {
        return res.status(400).json({ error: "Invalid date" });
    }

    const updatedMovie = {
        ...movies[movieIndex],
        title,
        director,
        year: y
    };

    movies[movieIndex] = updatedMovie;

    return res.json(updatedMovie);
});


app.delete("/movies/:id", (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id)){
        return res.status(400).json({error: "Invalid id (must be an integer)"})
    }

    const deleteId = movies.findIndex(m=> m.id === id);

    if(deleteId === -1){
        return res.status(404).json({error: "Id not found"})
    }

    movies.splice(deleteId, 1);

    return res.sendStatus(204);
})

app.use((req, res) => {
    res.status(404).json({ error: "Not Found: route does not exist" });
});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})