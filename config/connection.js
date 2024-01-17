const { connect, connection } = require("mongoose");
const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialDB";

connect(connectionString)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

module.exports = connection;
