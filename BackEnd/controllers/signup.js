const db = require('../config/dbConfig');



const signup = async (req,res) =>{

    const {user_name, user_email, password } = req.body

    if(!user_email || !user_name || !password){
        return res.send({error: "please fill all the fields"})
    }

    const checkUserQuery = 'SELECT * from users WHERE user_email = ?'

    db.query(checkUserQuery,[user_email], (err,result) => {
        if(err){
            return res.send({error: " Server error"})
        }    
        if(result.lenght > 0 ){
            return res.send({error: " user already exists"})
        }
    })

    const newUser = {
        user_name: user_name,
        user_email: user_email,
        password: password
    }

    const addUserQuery = ' INSERT INTO users SET ?'

    db.query(addUserQuery, [newUser] , (err,result)=>{
        if(err){
            return res.send({error: "error creating users"})
        }
        else{
            res.send({message: "user created successfully"})
        }
    })

}
