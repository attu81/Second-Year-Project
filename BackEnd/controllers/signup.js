const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');

const signup = (req, res) => {
    const { user_name, user_email, password } = req.body;

    if (!user_email || !user_name || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    const checkUserQuery = 'SELECT * FROM users WHERE user_email = ?';

    db.query(checkUserQuery, [user_email], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Server error" });
        }

        if (result.length > 0) {
            return res.status(409).json({ error: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = {
            user_name: user_name,
            user_email: user_email,
            password: hashedPassword
        };

        const addUserQuery = 'INSERT INTO users SET ?';

        db.query(addUserQuery, [newUser], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: "Error creating user" });
            } else {
                res.status(201).json({ message: "User created successfully" });
            }
        });

    });
};

module.exports = signup;

