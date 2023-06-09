import jsonwebtoken from "jsonwebtoken";

const createJWT = (userId: string, userEmail: string, userType: string) => {
  const secretText = process.env.JWT_SECRET;
  if (typeof secretText === "undefined") {
    throw new Error("jwt secret not found");
  }
  const token = jsonwebtoken.sign({ userId, userEmail, userType }, secretText);
  return token;
};

const verifyToken = (token: string) => {
  const secretText = process.env.JWT_SECRET;
  if (typeof secretText === "undefined") {
    throw new Error("jwt secret not found");
  }
  const decoded = jsonwebtoken.verify(token, secretText);
  return decoded;
};
export { createJWT, verifyToken };
