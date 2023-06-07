import jsonwebtoken from "jsonwebtoken";

const createJWT = (userId: string, userEmail: string) => {
  const secretText = process.env.JWT_SECRET;
  if (typeof secretText === "undefined") {
    throw new Error("jwt secret not found");
  }
  const token = jsonwebtoken.sign({ id: userId, email: userEmail }, secretText);
  return token;
};

export { createJWT };
