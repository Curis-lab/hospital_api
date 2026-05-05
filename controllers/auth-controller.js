import dotenv from "dotenv";
import {
  decrpytPwd,
  isCorrectPassword,
  tokenGenerate,
} from "../services/auth-services.js";
import DoctorServices from "../services/doctor-services.js";
import UserServices from "../services/user-services.js";
import uploadImage from "../src/infrastructure/plugins/imagekit/upload-file-imagekit.js";
import httpResponseFormat from "../utils/http-response-format.js";

dotenv.config();

export const auth = async (req, res) => {
  const { token, expire, signature } = imagekit.getAuthenticationParameters();
  res.send({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
};

export const register = async (req, res) => {
  const { name, email, password, role, gender } = req.body;
  try {
    const accountAlreadyExists = await new UserServices(role).extractUserByMail(email);

    if (accountAlreadyExists) {
      res
        .status(400)
        .json({ message: "Existing Email. Please change another." });
      return;
    }

    const hashedPassword = await decrpytPwd(password);
    let uploadedImage = null;

    if (req.file) {
      uploadedImage = await uploadImage(req.file);
    }

    const userInfo = {
      name,
      email,
      password: hashedPassword,
      photo: uploadedImage,
      gender,
      role,
    };

    new UserServices().createUser(userInfo);

    res.status(200).json({
      message: "Image upload successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

async function loginController(data) {
  try {
    const { email, password, role } = data;
    const user = await new UserServices(role).extractUserByMail(email);

    if (!user) {
      return httpResponseFormat(404, "User not found.");
    }

    const hashed = user.password;
    if (!hashed) {
      return httpResponseFormat(400, "Password is not exist");
    }

    if (!isCorrectPassword(password, hashed)) {
      return httpResponseFormat(400, "Password is not correct.");
    }

    //runtime level, but it flexible, high complexity.
    const token = tokenGenerate(user);
    
    const { appointments, _id, __v, ...rest } = user._doc;

    return httpResponseFormat(200, "Successfully logged in.", {
      token,
      ...rest,
      role,
    });
  } catch (err) {
    return httpResponseFormat(500, "Failed to login.");
  }
}
/**
 *
 * @param {email:string, password:string} req
 * @param {*} res
 */
export const login = async (req, res) => {
  const { code, message, body } = await loginController(req.body);
  res.status(code).json({ message, body });
};

/**
 *
 * @param {} req
 * @param {*} res
 */
export const test = async (req, res) => {
  try {
    const doctor = new DoctorServices();
    await doctor.create();
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "error" });
  }
};
