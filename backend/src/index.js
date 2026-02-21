/**
 * Entry Point of Backend Application
 * ---------------------------------------------------
 * This file is responsible for:
 * 1. Loading environment variables
 * 2. Establishing database connection
 * 3. Starting the Express server
 *
 * Server starts ONLY if MongoDB connects successfully.
 * If DB connection fails → application exits.
 */

// -----------------------------
// External Imports
// ----------------------------- 
import dotenv from 'dotenv';  // Loads environment variables from .env file
import {app} from './app.js'  // Express app instance
import connectDB from "./config/db.js"; // Database connection function

// -----------------------------
// Load Environment Variables
// -----------------------------
/**
 * Loads variables from .env file into process.env
 * Example:
 * - PORT
 * - MONGODB_URI
 * - DB_NAME
 */

// -----------------------------

dotenv.config({ path: './.env' })

// Database Connection & Server Start
// -----------------------------

/**
 * connectDB() returns a Promise.
 * If connection succeeds:
 *    → Start the server.
 * If connection fails:
 *    → Log error and terminate application.
 */
connectDB().then(()=>{
    /**
     * Start Express server
     * Uses PORT from .env
     * If not defined, defaults to 8000
     */
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
}).catch((error)=>{

    /**
     * If MongoDB connection fails:
     * - Log the error
     * - Exit application with failure code (1)
     *
     * process.exit(1) ensures:
     * - App does not run in broken state
     */
    console.log('Mongodb connection failed',error)
    process.exit(1)
})





