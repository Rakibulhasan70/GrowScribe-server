const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middlewear

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://easydoc:jcoMfnZUSQBKBNOI@cluster0.faflb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const inputCollection = client.db('EasyDoc').collection('react')

        app.post('/input', async (req, res) => {
            const news = req.body
            const result = await inputCollection.insertOne(news)
            res.send(result)
        })

        app.get('/inputs', async (req, res) => {
            const query = {}
            const cursor = inputCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        });

    }
    finally {

    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('GrowthScrtibe is running')
})

app.listen(port, () => {
    console.log('listenig  to port', port);
})
