
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eeint.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function connectDb() {

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("mongodb connected successfully");
}


// use it to connect specific database
export function getDb(dbName) {
    return client.db(dbName);
}

