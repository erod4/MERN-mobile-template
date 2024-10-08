const AppErr = require("../Utils/AppErr");
const verifyToken = require("../Utils/VerifyToken");
const getToken = require("../Utils/GetToken");
const isLoggedIn = (req, res, next) => {
  //get token, we created a function to get the token for us
  const token = getToken(req);
  //verify token
  const decodedUser = verifyToken(token);
  //check if userexists
  if (!decodedUser) {
    return next(new AppErr("Invalid/Expired Token, Please login again", 401));
  }
  //save the user into req obj
  ///can possibly get the id for the qr code from the req
  req.user = decodedUser.id;

  next();
};
module.exports = isLoggedIn;
