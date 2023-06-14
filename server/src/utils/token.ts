import jsonwebtoken from "jsonwebtoken";

const createJWT = (userId: string, userEmail: string, lives_in: string) => {
  const secretText = process.env.JWT_SECRET;
  if (typeof secretText === "undefined") {
    throw new Error("jwt secret not found");
  }
  const token = jsonwebtoken.sign({ userId, userEmail, lives_in }, secretText);
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
