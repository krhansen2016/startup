const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('conceptthreads');
const userCollection = db.collection('user');
const designCollection = db.collection('design');
const postsCollection = db.collection('posts');

(async function testConnection() {
    try {
        await db.command({ ping: 1 });
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

function getUser(email) {
    return userCollection.findOne({ email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
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
    return postsCollection.insertOne(post);
}

async function updatePost(post) {
    await postsCollection.updateOne({ id: post.id }, { $set: post });
}

async function getPosts() {
    return postsCollection.find().sort({ _id: -1 }).toArray();
}

async function getPostById(id) {
    return postsCollection.findOne({ id: id });
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