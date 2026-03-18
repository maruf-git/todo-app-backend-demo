import express from "express"
import "dotenv/config"
import { connectDb, getDb } from "./db.js";
import { ObjectId } from "mongodb";
import cors from "cors";

const app = express()
const PORT = 3000;

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000",
        "http://localhost:3001",
        "https://todo-app-frontend-demo-psi.vercel.app"
    ], // for local development]
}))

app.get("/", (req, res) => {
    res.send("hello from to do app backend")
})

// todo app operations



// create todo
// http://localhot:3000/api/create-todo -> when in local
// http:domainname.com/api/create-todo when it is hosted
app.post("/api/create-todo", async (req, res) => {
    try {
        // extract the data from the request body
        const todoData = req.body;
        console.log("api hit")
        console.log("found data: ", todoData);

        // save the data in the mongodb database
        const todoDb = getDb("MyTodoAppDb");
        const result = await todoDb.collection("todosCollection").insertOne(todoData)

        // sending confirmation of api result
        res.status(201).send({
            message: "Added new todo",
            data: result
        })

    } catch (err) {
        console.log(err)
        res.status(400).send({
            message: "Something went wrong",
            error: err
        })
    }
})

// get all todo
// http://localhost:3000/api/all-todo
// http://domainname.com/api/all-todo
app.get("/api/all-todo", async (req, res) => {
    try {
        // connect to MyTodoAppDb
        const todoDb = getDb("MyTodoAppDb");
        const result = await todoDb.collection("todosCollection").find().toArray();
        console.log("found data: ", result)

        res.status(200).send({
            message: "To do fetch successfully",
            data: result
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Something went wrong",
            error: err
        })
    }
})

// get a single todo
app.get("/api/all-todo/:id", async (req, res) => {
    try {
        // 
        const todoId = req.params.id;
        // connect to MyTodoAppDb
        const todoDb = getDb("MyTodoAppDb");
        const result = await todoDb.collection("todosCollection").findOne({ _id: new ObjectId(todoId) });
        console.log("found data: ", result)

        res.status(200).send({
            message: "Todo fetch successfully",
            data: result
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Something went wrong",
            error: err
        })
    }
})

// update a single todo
app.put("/api/all-todo/:id", async (req, res) => {
    try {
        const todoId = req.params.id;
        const updatedData = req.body;

        // connect to MyTodoAppDb
        const todoDb = getDb("MyTodoAppDb");
        const result = await todoDb.collection("todosCollection").updateOne({ _id: new ObjectId(todoId) }, { $set: updatedData });

        res.status(201).send({
            message: "Updation successful",
            data: result
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Updation Failed.Something went wrong",
            error: err
        })
    }
})

// delete a single todo
app.delete("/api/all-todo/:id", async (req, res) => {
    try {
        const todoId = req.params.id;

        // connect to MyTodoAppDb
        const todoDb = getDb("MyTodoAppDb");
        const result = await todoDb.collection("todosCollection").deleteOne({ _id: new ObjectId(todoId) });

        res.status(200).send({
            message: "Todo deleted successfully",
            data: result
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Deletion Failed.Something went wrong",
            error: err
        })
    }
})







// database connection
const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log("app is listening on port ", PORT)
        })
    } catch (error) {
        console.log("Database connection failed", error)
        process.exit(1)
    }
}
startServer();



// create me a todo app. using next js, javascript, shadcn, tailwind. use them for frontend. i will use my own express backend for that. i want this frontend for teaching purpose. i want to show sutdents how frontend work with bakend api. i dont need authentication and others here. use axios for network calls.  use custom toast for notification.

// my app will have create todo, see all todo, see a specific todo, update a specific to do and delete a specific todo. the app should be responsive. its ui should be mordern, attractive and user friendly. it should also have light and dark theme. use demo api call so that i can replace the api url easily . and also use proper comments so that it is helpful me to understand easily