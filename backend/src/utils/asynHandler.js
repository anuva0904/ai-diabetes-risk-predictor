/**
 * asyncHandler Utility
 * ---------------------------------------------------
 * Wraps async route handlers to automatically
 * catch errors and prevent application crashes.
 *
 * Without this, async errors are not handled properly
 * in Express and may crash the server.
 *
 * Usage:
 * router.get("/", asyncHandler(controllerFunction))
 */

const asyncHandler = (fn)=>async(req,res,next)=>{
    try{
        // Execute the async controller function
        await fn(req,res,next)
    }catch (error){
        /**
     * If error occurs:
     * - Send error response to client
     * - Default status code = 500 (Server Error)
     */
        res.status(error.code || 500).json({
            success:false,
            message: error.message
        })

    }
}