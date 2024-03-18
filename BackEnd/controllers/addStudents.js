const db = require("../config/dbConfig");

const addStudents = (req, res) => {
  const { studentName, dob, address, contact, doa ,  studentImage} = req.body;

  if (!studentName || !dob || !address || !contact || !doa ) {
    return res.status(500).json({ message: "Please fill all the details" });
  }

  const addStudentQuery = "INSERT INTO students VALUES SET ?";

  db.query(addStudentQuery, student, (err, data) => {
    if (err) {
      return res.status(400).json({ error: "Error adding student!" });
    }
    return res.status(200).json({ message: "Student added successfully!" });
  });
};

module.exports = addStudents;
