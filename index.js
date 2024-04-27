const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 5000




// middleware 
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k8vw6eq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(uri)

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

        const craftItemCollection = client.db("craftItemDB").collection("craftItem");
      

        // addCraft api
        app.post('/addCraftItem', async(req, res)=> {
            const craftItem = req.body
            console.log(craftItem)

            const result = await craftItemCollection.insertOne(craftItem);

            res.send(result)
        })

        // get api

        app.get("/craftItems", async(req, res)=> {

            const cursor = craftItemCollection.find();

            const result = await cursor.toArray()

            res.send(result)
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
    res.send("assignment ten server side is  running")
})

app.listen(port, () => {
    console.log(`assignment 10 server side is running on port : ${port} `)
})