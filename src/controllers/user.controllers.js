import { asynchandler } from '../utils/asynchandler.js';
import { ApiError } from '../utils/Apierror.js';
import { uploadoncloudinary } from '../utils/cloudinary.js';
import { User } from '../models/user.models.js'; // ✅ Correct import
import { ApiResponse } from '../utils/ApiResponse.js';

const registeruser = asynchandler(async (req, res) => {
     // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    const { fullName, email, password, username } = req.body;
    console.log("email: " + email);

    if ([fullName, email, password, username].some((field) => field?.trim() === "")) {
        throw new ApiError("Missing required field(s)", 400);
    }

    const existedUser = await User.findOne({ // ✅ Use `await` and `findOne`
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError("Username or email already exists", 409);
    }

    const avatarLocalpath = req.fields?.avatar?.[0]?.path;
    const coverImageLocalPath = req.fields?.coverImage?.[0]?.path;

    if (!avatarLocalpath) {
        throw new ApiError("Avatar image is required", 400);
    }

    const avatar = await uploadoncloudinary(avatarLocalpath);
    const coverImage = coverImageLocalPath ? await uploadoncloudinary(coverImageLocalPath) : null;

    if (!avatar) {
        throw new ApiError("Failed to upload avatar image", 500);
    }

    if (coverImageLocalPath && !coverImage) {
        throw new ApiError("Failed to upload cover image", 500);
    }

    await User.create({ // ✅ Use `await`
        fullName,
        email,
        password,
        username: username.toLowerCase(), // ✅ Use `toLowerCase()`
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    });

     const createduser =  await User.findById(user._id).select(
        "-password -refreshToken" // ✅ Exclude password field
     )

     if(!createduser){
        throw new ApiError("Failed to create user", 500);
     }

     return res.status(201).json(
        new ApiResponse(200, createduser, "user registered successfully")
     );
});

export { registeruser };
