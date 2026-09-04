import dotenv from 'dotenv';
import app from './app.js';
import connectDatabase from './config/database.js';

dotenv.config();

const port = process.env.PORT || 5000;

/** Start the API only after MongoDB Atlas connects successfully. */
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(port, () => console.log(`API listening on port ${port}`));
  } catch (error) {
    console.error(`Unable to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
