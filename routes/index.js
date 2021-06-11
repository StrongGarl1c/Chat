const express = require('express');
require('dotenv').config({ path: './config/.env' });
const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.API_URI;
const router = express.Router();
const axios = require('axios');

router.get('/', async function (req, res) {
  try {
    // connect to db
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const database = client.db('reenbit');
    const collection = database.collection('contacts');

    // find data
    const cursor = collection.find();

    // send data back to client
    const data = await cursor.toArray();
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

router.post('/', async function (req, res) {
  try {
    // connect to db
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const database = client.db('reenbit');
    const collection = database.collection('contacts');

    const { id, newMessage } = req.body;

    await collection.updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $push: { chatHistory: newMessage },
      },
    );

    const joke = await axios.get('https://api.chucknorris.io/jokes/random');
    await collection.updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $push: {
          chatHistory: {
            message: joke.data.value,
            date: new Date().toDateString(),
            from: newMessage.fromWhom,
          },
        },
      },
    );
    res.json(joke.data.value);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
