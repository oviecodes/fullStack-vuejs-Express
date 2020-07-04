const express = require('express');
const mongodb = require('mongodb');

const router = express.Router()


//get posts
router.get('/', async (req, res) => {
    const posts = await loadPostcollection();
    res.send(await posts.find({}).toArray())
})

//add post
router.post('/', async (req, res) => {
    const posts = await loadPostcollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send()
})


//delete post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostcollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send()
})

async function loadPostcollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://abc123:hybridtech@vueexpress.u82ab.mongodb.net/vueExpress?retryWrites=true&w=majority', { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('vueExpress').collection('posts');
}

module.exports = router;