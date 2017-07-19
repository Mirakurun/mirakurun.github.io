var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:G1233ng1245510@cluster0-shard-00-00-t6iax.mongodb.net:27017,cluster0-shard-00-01-t6iax.mongodb.net:27017,cluster0-shard-00-02-t6iax.mongodb.net:27017/greengrass?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

module.exports = {mongoose};