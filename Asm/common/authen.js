var jwt = require("jsonwebtoken");
exports.check = function (req, res, next) {
  let { token } = req.session;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};
exports.verifyToken = function verifyToken(req, res, next) {
  var authorization = req.header("Authorization");
  if (!authorization)
    return res
      .status(500)
      .send({ auth: false, messeage: "Failed to authenticate token  1" });
  var token = authorization.split(" ")[1];

  if (!token)
    return res.status(403).send({ auth: false, messeage: "No token provided" });

  jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, messeage: "Failded to authenticate token 2" });
    req.userId = decoded.id;
    next();
  });
};
