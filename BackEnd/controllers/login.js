const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');

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
            return res.status(404).json({ error: "User with this email does not exist" });
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
    });
};

module.exports = login;
