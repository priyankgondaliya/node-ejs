const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
console.log(client, "client");

const sendOtp = async function (to, otp) {
  return client.messages.create({
    body: `Your OTP is ${otp}. OTP is valid for 5 minutes.`,
    from: +15753080052,
    to,
  });
};

module.exports = {
  sendOtp,
};
