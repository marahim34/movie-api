import dotenv from "dotenv"
import { MongoClient} from "mongodb";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DBNAME;
const collectionName = process.env.DBCOLLECTION;

const client = new MongoClient(uri);

const initialMovies = [ 
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 }, 
  { id: 2, title: "The Matrix", director: "The Wachowskis", year: 1999 }, 
  { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019 } 
];

let moviesCollection;
let db;

export const initDatabase = async () => {
  try {
    await client.connect();

    if (!dbName || !collectionName) {
        throw new Error("DBNAME or DBCOLLECTION is not set in the environment");
    }
    
    db = client.db(dbName);
    moviesCollection = db.collection(collectionName);
    
    const count = await moviesCollection.countDocuments();

    if (count === 0) {
      const result = await moviesCollection.insertMany(initialMovies);
      console.log("Inserted initial movies:", result.insertedCount);
    } else {
      console.log("The DB had some movies");
    }

    console.log("Connected to MongoDB, collection ready!");

    return moviesCollection;
  } catch (err) {
    console.error("Failed to start app:", err);
    throw err;
  }
}

export const getDB = () => db;
export const getMoviesCollection = () => moviesCollection; 