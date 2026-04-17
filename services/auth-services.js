import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function decrpytPwd(pwd) {
	const salted = await bcrypt.genSalt(10);
	const hashed = await bcrypt.hash(pwd, salted);
	return hashed;
}

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

export { decrpytPwd, isCorrectPassword, tokenGenerate };
