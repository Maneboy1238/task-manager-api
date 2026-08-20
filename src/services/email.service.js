const fs = require("node:fs");
const crypto = require("crypto");
const dayjs = require("dayjs");
const resend = require("../config/resend");
const userModel = require("../models/user.model");
const hash = require("../utils/hash");
const { AppError } = require("../utils/error");
const verificationEmailHTML = require("../emails/renderEmails");

const emailService = {
  async sendVerificationEmail(uid) {
    const user = await userModel.get(uid);
    if (!user)
      throw new AppError({ statusCode: 404, message: "user not found" });
    if (user.emailToken)
      throw new AppError({
        statusCode: 409,
        message: "A verification mail has been sent. Pls check your inbox",
      });

    const token = crypto.randomUUID();
    const hashToken = await hash.create(token);
    const tokenExpiryDate = dayjs().add(10, "minute").toDate();
    console.log(tokenExpiryDate);
    userModel.update(uid, {
      emailToken: hashToken,
      emailTokenExpiresIn: tokenExpiryDate,
    });

    await sendMail(user.name, user.email);
    return user.email;
  },
};

const attachment = fs
  .readFileSync("src/emails/static/xero-todo.webp")
  .toString("base64");
async function sendMail(name, userEmail) {
  const html = await verificationEmailHTML(name);
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: userEmail,
    subject: "Verify your email address",
    html,
    attachments: [
      {
        content: attachment,
        filename: "xero-todo.webp",
        contentId: "xero-todo-image",
      },
    ],
  });
  if (error) {
    console.error({ error });
    if (error?.name === "invalid_from_address") {
      throw new AppError({ statusCode: 422, message: error.message });
    }
    throw new AppError({ statusCode: 500, message: error.message });
  }

  console.log({ data });
}

module.exports = emailService;
