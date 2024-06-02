const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;
let dB;

const mongoConnect = (cb) => {
    mongoClient.connect("mongodb+srv://zizo:abdelaziz@cluster0.0cachr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then((client) => {
        dB = client.db();
        cb();
    }).catch(err => console.log(err));
};

const getDb = () => {
    if(dB){
        return dB;
    }
    throw "No database!";
};

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;
