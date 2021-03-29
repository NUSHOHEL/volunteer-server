const express = require('express')
const app = express();
const cors= require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
app.use(cors());
app.use(bodyParser.json())
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4w305.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.PORT || 8080


// connet to the mongoDB



client.connect(err => {
  const eventsCollection = client.db("volunteer").collection("events");
app.post('/addevents', (req,res)=>{
    const newEvent= req.body;
    console.log('adding new Event', newEvent);
    eventsCollection.insertOne(newEvent)
    .then(result=>{
        console.log('inserted count',result.insertedCount);
        res.send('inserted to mongodb')
    })
})

app.get('/events', (req,res)=>{
    eventsCollection.find().toArray((err,items)=>{
        console.log('from database',items);
        res.send(items)
    })
})


});




app.get('/', (req, res) => {
  res.send('dfsdfsdfsf sdfsdf!')
})






app.listen(process.env.PORT || port)