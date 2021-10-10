const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.gg0ce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.insertMessage = async (message) => {
  await client.connect();
  const collection = client.db("chat").collection("chats");
  const doc = { text: message.text, userName: message.userName };
  await collection.insertOne(doc);
  client.close();
}

exports.getMessages = async () => {
  await client.connect();
  const collection = client.db("chat").collection("chats");
  const messages = await collection.find({}).toArray();
  client.close();
  return messages;
}