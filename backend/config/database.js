const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

class DatabaseSetup {
  constructor() {
    this.mongoServer = null;
  }

  async connect() {
    try {
      // Try to connect to local MongoDB first
      const localURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/infinity-zone';
      
      if (localURI.includes('localhost')) {
        try {
          await mongoose.connect(localURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 3000, // Timeout after 3s instead of 30s
          });
          console.log('✅ Connected to local MongoDB');
          return true;
        } catch (err) {
          console.log('⚠️  Local MongoDB not available, starting in-memory database...');
          return await this.startInMemoryDB();
        }
      } else {
        // External MongoDB (Atlas, etc.)
        await mongoose.connect(localURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('✅ Connected to external MongoDB');
        return true;
      }
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
  }

  async startInMemoryDB() {
    try {
      this.mongoServer = await MongoMemoryServer.create({
        instance: {
          dbName: 'infinity-zone-dev'
        }
      });
      
      const mongoUri = this.mongoServer.getUri();
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      console.log('✅ In-memory MongoDB started successfully');
      console.log('📝 Note: Data will be lost when server restarts');
      return true;
    } catch (error) {
      console.error('❌ Failed to start in-memory database:', error.message);
      return false;
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      if (this.mongoServer) {
        await this.mongoServer.stop();
      }
    } catch (error) {
      console.error('Error disconnecting from database:', error);
    }
  }
}

module.exports = new DatabaseSetup();
