const { OAuth2Client } = require("google-auth-library");

module.exports = async (req, res, next) => {
  const CLIENT_ID = '315722276440-82puesffcomdraa91hdr1efvb4qef8dh.apps.googleusercontent.com';
  try {
    const token = req.headers.authorization.split(" ")[1];
    const client = new OAuth2Client(CLIENT_ID);
    const user = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    req.body = { userAuthData: user.getPayload(), ...req.body };

    next();
  } catch (err) {
    res.status(401).json({
      error: "Invalid user",
    });
  }
};
