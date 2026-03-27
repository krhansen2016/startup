const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('conceptthreads');
const userCollection = db.collection('user');
const designCollection = db.collection('design');
const postCollection = db.collection('post');

(async function testConnection() {
    try {
        await client.connect();
        await db.command({ ping: 1 });
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

async function getUser(email) {
    return await userCollection.findOne({ email });
}

async function getUserByToken(token) {
    return await userCollection.findOne({ token });
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function updateUserRemoveAuth(user) {
    await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

async function addDesign(design) {
    return designCollection.insertOne(design);
}

async function deleteDesign(id, userEmail) {
    return designCollection.deleteOne({ id, userEmail });
}

async function getDesignsByUser(email) {
    return designCollection.find({ userEmail: email }).toArray();
}

async function getDesignById(id) {
    return designCollection.findOne({ id: id });
}

async function addPost(post) {
    return postCollection.insertOne(post);
}

async function updatePost(post) {
    const { _id, ...rest } = post;
    await postCollection.updateOne({ id: post.id }, { $set: rest });
}

async function getPosts() {
    return postCollection.find().sort({ _id: -1 }).toArray();
}

async function getPostById(id) {
    return postCollection.findOne({ id: id });
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    updateUserRemoveAuth,
    addDesign,
    deleteDesign,
    getDesignsByUser,
    getDesignById,
    addPost,
    updatePost,
    getPosts,
    getPostById
}