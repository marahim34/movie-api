🎬 Movie API

Welcome!

This is a small Movie API I built while learning backend development in the TAMK Full Stack course.
The goal was simple: practice Express.js, routing, and working with basic data — nothing too fancy.

🌟 What This API Does

Right now, it’s a tiny in-memory movie catalog.

You can:

➕ Add movies
📄 List all movies
🔍 Get a movie by its ID
✏️ Update movie info
🗑️ Delete movies

Everything runs locally and resets each time the server restarts — perfect for learning.

🧰 Tech Behind It

- Node.js
- Express.js
- Nodemon (so I don’t keep restarting manually)
- api.http file for quick testing

That’s it. Lean and clean.

🚀 How to Run It

Clone the project:

git clone https://github.com/marahim34/movie-api.git
cd movie-api

Install the necessary packages:
npm install

Start the server (with auto-restart):
npm run dev

The API will be available at:
http://localhost:3000

🛣️ API Endpoints

GET /movies
Returns the full movie list.

POST /movies
Adds a new movie.
Example body:
{
  "title": "Inception",
  "director": "Christopher Nolan",
  "year": 2010
}

GET /movies/:id
Finds a movie by its ID.

PUT /movies/:id
Updates the selected movie.

DELETE /movies/:id
Removes the movie from the list.

📂 Project Layout
movie-api/
│── index.js
│── api.http
│── package.json
│── package-lock.json
└── .gitignore
