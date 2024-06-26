import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../util/token.js";

// import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signupUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      gender,
      address,
      age,
      phone,
    } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email Not Valid" });
    }

    if (age < 0) {
      return res.status(400).json({ error: "Age Not Valid" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords Dont Match" });
    }

    if (gender !== "male" && gender !== "female") {
      return res.status(400).json({ error: "Invalid Gender Input" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Email already exist" });
    }

    //HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      gender,
      address,
      age,
      phone,
    });

    if (newUser) {
      // Generate JWT Token
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in Signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log(user);
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // const token=jwt.sign({email:email},"USER")

    // res.cookie("jwt", token, {
    //   maxAge: 15 * 24 * 60 * 60 * 1000, //in ms
    //   httpOnly: true, //prevent xss attacks cross-site scripting attacks or cookie is not accessable via js
    //   sameSite: "strict",
    //   path: '/', // cookie will be available for all routes
    // });

    generateTokenAndSetCookie(user._id, res);

    // console.log("yooooooo");

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in Login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function isValidEmail(email) {
  const re = /@.*\.com/;
  return re.test(email);
}
