const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

class DatabaseSetup {
  constructor() {
    this.mongoServer = null;
  }

  async connect() {
    try {
      // Get MongoDB URI from environment
      const mongoURI = process.env.MONGODB_URI;
      
      if (!mongoURI) {
        console.log('⚠️  No MONGODB_URI found, starting in-memory database...');
        return await this.startInMemoryDB();
      }

      // Check if it's a MongoDB Atlas URI or local URI
      if (mongoURI.includes('mongodb+srv://') || mongoURI.includes('mongodb.net')) {
        // MongoDB Atlas connection with updated options
        await mongoose.connect(mongoURI, {
          serverSelectionTimeoutMS: 10000, // 10 seconds timeout for Atlas
          connectTimeoutMS: 10000,
          socketTimeoutMS: 45000,
          maxPoolSize: 10,
          minPoolSize: 5,
          maxIdleTimeMS: 30000,
          bufferCommands: false,
        });
        console.log('✅ Connected to MongoDB Atlas');
        console.log('🌐 Database: Live production database');
        console.log('📊 Database name:', mongoose.connection.name);
        return true;
      } else if (mongoURI.includes('localhost')) {
        // Local MongoDB connection
        try {
          await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 3000, // Timeout after 3s for local
          });
          console.log('✅ Connected to local MongoDB');
          return true;
        } catch (err) {
          console.log('⚠️  Local MongoDB not available, starting in-memory database...');
          return await this.startInMemoryDB();
        }
      } else {
        // Other external MongoDB
        await mongoose.connect(mongoURI, {
          serverSelectionTimeoutMS: 10000,
        });
        console.log('✅ Connected to external MongoDB');
        return true;
      }
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      console.log('⚠️  Falling back to in-memory database...');
      return await this.startInMemoryDB();
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
      await mongoose.connect(mongoUri);
      
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
