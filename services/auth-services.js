import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function decrpytPwd(pwd) {
  if (!pwd) throw new Error("Password did not have in decryptPwd function.");
  const password = pwd;
  const salted = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salted);
  return hashed;
}

function tokenGenerate(data) {
  const { _id, role } = data;
  return jwt.sign({ id: _id, role }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
}

async function isCorrectPassword(currentpwd, dbpwd) {
  if (dbpwd === "undefined") {
    throw new Error("Database did not response password.");
  }
  if (currentpwd === "undefined") {
    throw new Error("user did not input password.");
  }
  const isMatch = await bcrypt.compare(currentpwd, dbpwd);
  return isMatch;
}

export { decrpytPwd, isCorrectPassword, tokenGenerate };
