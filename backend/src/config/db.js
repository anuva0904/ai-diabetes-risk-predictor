/*
 * Database Connection Module
 * --------------------------------------------
 * This module establishes a connection to MongoDB Atlas
 * using Mongoose.
 *
 * It reads environment variables from process.env:
 * - MONGODB_URI → Atlas cluster connection string
 * - DB_NAME → Database name inside the cluster
 * - NODE_ENV → Determines environment (development/production)
 *
 * In production mode, autoIndex is disabled for performance.
 */


import mongoose from "mongoose"
const connectDB = async()=>{
    try{
        // Check if application is running in production mode
        const isProduction = process.env.NODE_ENV==='production';
        /**
         * Connect to MongoDB
         * The database name is appended to the cluster URI.
         */
        const connectionInstance =await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`,{
            // Disable automatic index creation in production
            autoIndex: !isProduction
        })
    /**
     * Log successful connection
     * Displays the host of the connected cluster
     */
        console.log(`MongoDB connected succesfully. DB Host: ${connectionInstance.connection.host}`);
    }
    catch(error){
    /**
     * If connection fails:
     * - Log error
     * - Exit process with failure code
     */
        console.log('MongoDB connection Failed:',error);
        process.exit(1);


    }
}

export default connectDB