const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const port = process.env.PORT || 5000;

// MiddleWare:
app.use(cors());
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ovwhpk1.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const userCollection = client.db("SendEasy").collection("Users");

        // get token from the user

        app.post("/jwt", async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.SECRET_TOKEN, {
                expiresIn: "1h"
            })

            res.send({ token })
        })

        // user information are sending to the dataabse.
        app.post("/registerUser", async (req, res) => {
            const userInformation = req.body;
            console.log(userInformation);
            const result = await userCollection.insertOne(userInformation);
            res.send(result)
        })

        // All users details request by Admin

        app.get("/allUsers", async (req, res) => {
            const users = await userCollection.find().toArray();
            res.send(users)

        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("courier service is running")
})

// jwt token






app.listen(port, () => {
    console.log(`courier service is running at ${port}`);
})