const db = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { user_email, password } = req.body;

  if (!user_email || !password) {
    return res.status(400).json({ error: "Fields cannot be empty" });
  }

  const checkEmail = "SELECT * FROM users WHERE user_email = ?";

  db.query(checkEmail, [user_email], async (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Error from server" });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ error: "User with this email does not exist" });
    }

    // User found, check password
    const user = result[0];
    try {
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
      // Password is correct, login successful
      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      return res.status(500).json({ error: "Error comparing passwords" });
    }

    // Function to generate a random secret key
    const generateRandomSecretKey = () => {
      return crypto.randomBytes(32).toString("hex");
    };

    // Generate JWT token
    const randomSecretKey = generateRandomSecretKey();
    const token = jwt.sign(
      { id: data[0].user_id, email: data[0].email },
      randomSecretKey,
      { expiresIn: "2d" }
    );

    const userInfo = {
        user_id: user.user_id,
        user_name: user.user_name,
        email: user.email,
        profile_picture: user.profile_picture
      };

    // Set cookie and send response
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .send({ userInfo, token, message: "User logged in successfully" });
  });
};

module.exports = login;
