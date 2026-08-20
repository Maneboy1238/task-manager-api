require("esbuild-register")
const { render } = require("@react-email/render");
const VerificationEmail = require("./VerificationEmail.jsx");

const verificationEmailHTML = async (name) => {
    return await render(VerificationEmail({name}))
}
 
module.exports = verificationEmailHTML;