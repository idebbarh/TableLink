import bcrypt from "bcrypt";

const hashPassword = async (textPassword: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(textPassword, 5);
  return hashedPassword;
};

const compareTwoPasswords = async (
  textPassword: string,
  encryptedPassword: string
): Promise<boolean> => {
  const res = await bcrypt.compare(textPassword, encryptedPassword);
  return res;
};

export { hashPassword, compareTwoPasswords };
