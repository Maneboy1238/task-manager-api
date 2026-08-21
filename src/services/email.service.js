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
    const user = await userModel.getById(uid);
    if (!user)
      throw new AppError({ statusCode: 404, message: "user not found" });
    const isEmailTokenSent = user.emailToken && dayjs().isBefore(user.emailTokenExpiresAt)
    if (isEmailTokenSent)
      throw new AppError({
        statusCode: 409,
        message: "A verification mail has been sent. Pls check your inbox",
      });

    const token = crypto.randomUUID();
    console.log(token)
    const hashToken = await hash.create(token);
    const tokenExpiryDate = dayjs().add(10, "second").toDate();
    console.log(tokenExpiryDate);
    await userModel.updateById(uid, {
      emailToken: hashToken,
      emailTokenExpiresAt: tokenExpiryDate,
    });

    await sendMail(user.name, user.email);
    return user.email;
  },
  async verifyEmail(uid, token) {
    const user = await userModel.getById(uid);
    if (!user) throw new AppError({ statusCode: 404, message: "user not found" });
    if (dayjs().isAfter(user.emailTokenExpiresAt)) throw new AppError({statusCode: 410, message: "Token is expired"})
    if (!hash.compare({normal: token, hash: user.emailToken})) throw new AppError({statusCode: 400, message: "Token is invalid"})
    const update = await userModel.updateById(uid, { isEmailVerified: true, emailToken: null, emailTokenExpiresAt: null})
    console.log(update)
  }
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
