"use strict";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function tokenGenerate(data) {
  const { _id, role } = data;
  return jwt.sign({ id: _id, role }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
}

async function isCorrectPassword(currentpwd, dbpwd) {
  const isMatch = await bcrypt.compare(currentpwd, dbpwd);
  return isMatch;
}

export { isCorrectPassword, tokenGenerate };
