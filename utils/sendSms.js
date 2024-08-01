const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(
  "AC890d31575db260908bd9d0d0b792f296",
  "76a187da26b6d365fba440a42db89277"
);
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
