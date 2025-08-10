import sgMail from "@sendgrid/mail";

const sendEmail = async (data) => {
  const mail = { ...data, from: "yuliazinchenko2006@gmail.com" };
  await sgMail.send(mail);
  return true;
};

export default sendEmail;
