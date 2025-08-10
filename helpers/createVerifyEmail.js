import dotenv from "dotenv";
dotenv.config();

const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target='_blank href="${BASE_URL}/api/auth/verify/${verificationToken}">Confirm email</a>`,
  };
  return mail;
};

export default createVerifyEmail;
