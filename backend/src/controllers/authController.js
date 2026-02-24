import {asyncHandler} from '../utils/asyncHandler.js'
import ApiError from '../utils/apiError.js'
import ApiResponse from '../utils/apiResponse.js' 
import { User } from '../models/userModel.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'

/*export const registerUser = asyncHandler(async (req,res)=>{
    //get user details
    //validation -not empty
    //check if user already exists:email
    //check for images , check for avatar
    //upload on cloudinary
    //create user object
    //remove password and referesh token field from response
    //check for user creation response
    //return the response else send error
    const {firstName,lastName,email,phoneNumber,password}=req.body
    
    const requiredFields = [firstName, lastName, email, phoneNumber, password];
    if (requiredFields.some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser= await User.findOne({email})

    if(existingUser){
        throw new ApiError(409,"User with email already exist")
    }

    //const profilePhotoPath = req.file?.path;
    
    //if(!profilePhotoPath){
        //throw new ApiError(400,'Profile Pic is required');
   // }

    //const photo=await uploadOnCloudinary(profilePhotoPath);

    //if(!photo){
    //    throw new ApiError(400,'Profile Pic is required');
    //}

    const newUser=await User.create({
        firstName,
        lastName,
        //profilePhoto:photo.url,
        password,
        phoneNumber,
        email
    })

    const createdUser=await User.findById(newUser._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(500,"User not registered, Try again after sometime.");
    }

    return res.status(201).json(
        new ApiResponse(201,"User registered Successfully", createdUser)
    )


})*/


/*export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  const requiredFields = [firstName, lastName, email, phoneNumber, password];
  if (requiredFields.some(field => !field || field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with email already exist");
  }

  const newUser = await User.create({
    firstName,
    lastName,
    password,
    phoneNumber,
    email
  });

  const createdUser = await User.findById(newUser._id)
    .select("-password -refreshToken");

  return res.status(201).json(
    new ApiResponse(201, "User registered Successfully", createdUser)
  );
});*/

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  const requiredFields = [firstName, lastName, email, phoneNumber, password];
  if (requiredFields.some(field => !field || field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with email already exist");
  }

  // 🔥 File check
  const profilePhotoPath = req.file?.path;
  console.log("File path:", profilePhotoPath);

  if (!profilePhotoPath) {
    throw new ApiError(400, "Profile photo is required");
  }

  // 🔥 Upload to Cloudinary
  const uploadedPhoto = await uploadOnCloudinary(profilePhotoPath);

  if (!uploadedPhoto) {
    throw new ApiError(500, "Failed to upload profile photo");
  }

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    profilePhoto: uploadedPhoto.secure_url // use secure_url
  });

  const createdUser = await User.findById(newUser._id)
    .select("-password -refreshToken");

  return res.status(201).json(
    new ApiResponse(201, "User registered Successfully", createdUser)
  );
});