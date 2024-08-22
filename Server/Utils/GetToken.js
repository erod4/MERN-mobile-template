const getToken = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("Token: ", token);

  if (token != undefined) {
    return token;
  } else {
    return { status: "failed", message: "Token Not Found" };
  }
};

module.exports = getToken;
