const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middlewear

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.faflb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const inputCollection = client.db('EasyDoc').collection('react')

        const studentCollection = client.db('EasyDoc').collection('student')

        const subjectCollection = client.db('EasyDoc').collection('student-subject')

        app.post('/add', async (req, res) => {
            const bio = req.body
            const result = await studentCollection.insertOne(bio)
            res.send(result)
        })


        app.delete('/addDelete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await studentCollection.deleteOne(query)
            res.send(result)
        })


        app.get('/shows', async (req, res) => {
            const query = {}
            const cursor = studentCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        });


        app.put('/shows/:id', async (req, res) => {
            const id = req.params.id;
            const updatUser = req.body;
            const filter = { _id: ObjectId(id) }
            const option = { upsert: true };
            const updateDoc = {
                $set: {
                    firstName: updatUser.firstName,
                    lastName: updatUser.lastName,
                    date: updatUser.date,
                    age: updatUser.age,
                    city: updatUser.city,
                    skill: updatUser.skill,
                    EnrollmentFrom: updatUser.EnrollmentFrom,
                    EnrollmentTo: updatUser.EnrollmentTo,
                    status: updatUser.status,
                    Standard: updatUser.Standard,
                    brief: updatUser.brief,
                }
            };
            const result = await studentCollection.updateOne(filter, updateDoc, option)
            res.send(result);
        });


        app.get('/shows/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await studentCollection.findOne(query);
            res.send(result)
        });

        // //////////////////////////////////////////////////////////////////////////////


        app.get('/show', async (req, res) => {
            const query = {}
            const cursor = subjectCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        });


        app.delete('/subjectAdd/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await subjectCollection.deleteOne(query)
            res.send(result)
        })

        app.post('/subjectAdd', async (req, res) => {
            const bio = req.body
            const result = await subjectCollection.insertOne(bio)
            res.send(result)
        })




        // app.post('/input', async (req, res) => {
        //     const news = req.body
        //     const result = await inputCollection.insertOne(news)
        //     res.send(result)
        // })

        // app.get('/inputs', async (req, res) => {
        //     const query = {}
        //     const cursor = inputCollection.find(query)
        //     const result = await cursor.toArray()
        //     res.send(result)
        // });

    }
    finally {

    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('GrowthScrtibe is running done')
})

app.listen(port, () => {
    console.log('listenig  to port', port);
})
