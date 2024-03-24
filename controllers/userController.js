const UserModel = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.registerUser = async (req, res) => {
    console.log("registerUser Route");
    try{
        if (req.body.username && req.body.password && req.body.name) {
            //mdp hash
            console.log(req.body);

            const salt = await bcrypt.genSalt(10);
            let pass = req.body.password; 
            pass = await bcrypt.hash(pass, salt);
            
            let user = UserModel({
                username: req.body.username,
                password: pass,
                name : req.body.name
            })
            
            await user.save();
                        
            console.log("Well registred ! ");
            res.status(200).json({ message: "Well registered ! " });
        } else {
          res.status(400).json({ message: "Missing some info (User : name, username, password)" });
    
        }
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal Server Error');
    }

}



exports.loginUser = (req, res) => {
    const userU = req.body.username;
    const passwordU = req.body.password;
    UserModel.findOne({ username : userU })
      .then(user => {
        console.log(user);
        if (user) {
          console.log(passwordU);
          bcrypt.compare(passwordU, user.password)
            .then(result => {
              console.log(result);
              if (result) {
                const token = jwt.sign({
                  user: {
                    id : user._id,
                    username: user.username,
                    name: user.name
                  }
                },
                process.env.SIGN,
                  {  });
                return res.status(200).json({
                  message: "login success",
                  token: token
                });
              } else {
                return res.status(401).json({
                  erreur: "password incorrect"
                });
              }
            })
          
        } else {
          return res.status(404).json({ erreur: "No Account Found" });
        }
      });
  }