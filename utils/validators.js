function isEmail(value) {
  return typeof value === "string" && value.includes("@");
}
function isString(value, min = 0) {
  return typeof value === "string" && value.length >= min;
}
function isNumber(value) {
  return !isNaN(value);
}
function isEnum(value, list) {
  return list.includes(value);
}
function isArray(value) {
  return Array.isArray(value);
}

export  { isEmail, isString, isNumber, isEnum, isArray };
