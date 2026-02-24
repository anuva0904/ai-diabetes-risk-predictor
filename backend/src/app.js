/**
 * Express Application Configuration
 * ---------------------------------------------------
 * This file initializes and configures the Express app.
 * It sets up middleware and prepares the application
 * for handling API requests.
 */

// ==================================================
// External Imports (Third-party libraries)
// ==================================================

import express from "express"  // Web framework for Node.js
import cors from "cors"        // Enables Cross-Origin Resource Sharing
import cookieParser from "cookie-parser" // Parses cookies from client requests

// ==================================================
// Internal Imports (Project files)
// ==================================================
import userRoutes from './routes/userRoutes.js'




// ==================================================
// Initialize Express App
// ==================================================
const app = express()


// ==================================================
// Middleware Configuration
// ==================================================

/**
 * CORS Configuration
 * Allows frontend application (defined in .env)
 * to communicate with this backend server.
 */
app.use(cors(
    {
        origin : "*", // Frontend URL
        credentials:true                  // Allow cookies/auth headers
    }
))


/**
 * Parse incoming JSON requests
 * Required for APIs that receive JSON payload.
 */
app.use(express.json())
/**
 * Parse URL-encoded form data
 * extended: true allows nested objects.
 */
app.use(express.urlencoded({extended:true}))

/**
 * Serve static files from "public" directory
 * Example: public/images/logo.png
 */
app.use(express.static("public"))
/**
 * Parse cookies from incoming requests
 * Useful for authentication using JWT in cookies.
 */
app.use(cookieParser())


app.use('/api/v1/users',userRoutes);

// ==================================================
// Export App Instance
// ==================================================
export {app}




