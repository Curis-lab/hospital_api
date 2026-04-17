import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import uploadImage from "../src/infrastructure/plugins/imagekit/upload-file-imagekit.js";
import generateAuthGateway from "../src/use-cases/generate-auth/generate-auth.gateway.js";

const authGateway = new generateAuthGateway();

async function findUserByEmailAndRole(email, role) {
  let user;
  if (role === "patient") {
    user = await authGateway.findPatientByEmail(email);
  } else if (role === "doctor") {
    user = await authGateway.getDoctorByEmail(email);
  }
  return user;
}

async function findUserByEmail(email) {
  let user;
  user = await authGateway.getDoctorByEmail(email);
  if (!user) {
    user = await authGateway.findPatientByEmail(email);
  }
  return user;
}

/** password processing */

async function passwordSalting(passsword) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(passsword, salt);
  return hashPassword;
}

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

export const auth = async (req, res) => {
  const { token, expire, signature } = imagekit.getAuthenticationParameters();
  res.send({
    token,
    expire,
    signature,
    publicKey: "public_yRZslw98mgzoetGRkyyG2boI+nA=",
  });
};

export const register = async (req, res) => {
  const { email, password, name, role, gender } = req.body;

  try {
    const existingUser = await findUserByEmailAndRole(email, role);
    if (existingUser) {
      res
        .status(400)
        .json({ message: "Existing Email. Please change another." });
      return;
    }

    const hashPassword = await passwordSalting(password);

    const uploadedImage = await uploadImage(req.file);

    const userInfo = {
      name,
      email,
      password: hashPassword,
      photo: req.file && uploadedImage.url,
      gender,
      role,
    };

    let user;

    if (role === "patient") {
      user = await authGateway.patientRegister(userInfo);
    } else if (role === "doctor") {
      user = await authGateway.registerDoctor(userInfo);
    }

    await user.save();

    delete user.password;

    res.status(200).json({
      message: "Image upload successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      res.status(404).json({ status: false, message: "User not found." });
      return;
    }

    if (!user.password) {
      res
        .status(400)
        .json({ status: false, message: "Password is not exist." });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res
        .status(400)
        .json({ status: false, message: "Passwrod is not correct." });
      return;
    }

    const token = generateToken(user);
    const { role, appointments, ...rest } = user._doc;
    res.status(200).json({
      status: true,
      message: "Successfully logged in.",
      token,
      data: { ...rest },
      role,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Failed to login." });
  }
};
