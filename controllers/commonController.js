const User = require("../models/user");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = process.env.Secret || "test";

function generateToken(userid) {
  return Jwt.sign({ id: userid }, secret, { expiresIn: 15552000 });
}

exports.userregistration = async (req, res) => {
  let email = req.body.email.toLowerCase();
  let firstname = req.body.firstname.toLowerCase();
  let lastname = req.body.lastname.toLowerCase();
  const user = User({
    firstname: firstname,
    lastname: lastname,
    age: req.body.firstname,
    email: email,
    pass: bcrypt.hashSync(req.body.pass, 8),
  });

  const data = await user.save();
  res.send({ message: "user Added", data: data });
};

exports.userLogin = async (req, res) => {
  if (req.body.email == "" || req.body.email == null) {
    return res.status(400).send({
      message: "email can not be empty",
    });
  }

  if (req.body.pass == "" || req.body.pass == null) {
    return res.status(400).send({
      message: "pass can not be empty",
    });
  }


  let email = req.body.email.toLowerCase();
  const check_email = await User.find({ email: email });
   
    console.log(req.body,check_email)
  if (check_email.length>0) {
    let passwordIsValid = bcrypt.compareSync(
      req.body.pass,
      check_email[0].pass
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    } else {
      let token = generateToken(check_email._id);
      return res.status(200).send({
        accessToken: token,
        data: check_email[0],
      });
    }
  } else {
    return res.send({ error: { message: "user does not exist" } });
  }
};
