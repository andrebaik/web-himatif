const app = require('./app');
const pool = require('./config/database');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await pool.getConnection();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
