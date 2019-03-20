const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://mongo:27017';
const dbName = 'devopsproject';
const client = new MongoClient(url);

async function registerName (name) {
    const connection = await client.connect(url);
    const db = await connection.db(dbName);
    await db.collection('names').insertOne(name, function (err, r) {
        assert.equal(null, err);
        assert.equal(1, r.insertedCount);
        connection.close();
    });
    return true;
}

async function getLastFiveNames () {
    const connection = await client.connect(url);
    const db = await connection.db(dbName);
    const names = await db.collection('names')
                          .find({})
                          .sort({_id:-1})
                          .limit(5)
                          .toArray();
    connection.close();
    return names;
}

module.exports = {
    getLastFiveNames,
    registerName
};
