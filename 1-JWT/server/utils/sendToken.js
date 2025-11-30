export async function sendToken(user, satusCode, message, res) {
  console.log("send token working");
  const token = await user.generateToken();
  console.log(token);
  res
    .status(satusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      user,
      message,
      token,
    });
}
