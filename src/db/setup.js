const mongoose = require('mongoose');

/**
 * Initialize database connection using environment variables.
 */
const initDb = () => {
  // Destructure the required environment variables
  const {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME
  } = process.env;

  // Create the MongoDB URI using environment variables
  // Note: The `encodeURIComponent` is used to handle special characters in the username or password
  const mongoUri = `mongodb://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASS)}@${DB_HOST}/${DB_NAME}`;

  // Connect to MongoDB
  mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      console.log('Successfully connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1); // Exit the process if unable to connect
    });
};

module.exports = {initDb};
