const express = require('express')
const cors = require('cors')

const signupRoute = require('./controllers/signup')
const loginRoute = require('./controllers/login')
const addStudentRoute = require('./controllers/addStudents')


const app = express()
app.use(express.json());
app.use(cors())

app.post("/signup", signupRoute)
app.post("/login", loginRoute)
app.post("/addStudent", addStudentRoute)


app.listen(8000,(req,res) => {
    console.log("listening from port 8000")

})

