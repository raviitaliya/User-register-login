import express from "express";
const secretkey = "niwhefhwefhwoeoqdjoqj";

const app = express();


const login = async (req,res)=> {
        const { username, password } = req.body; 
      
        jwt.sign({ username, password }, secretkey, { expiresIn: "7d" }, (err, token) => {
          if (err) {
            res.status(500).json({ error: 'Failed to generate token' });
          } else {
            res.json({
              token,
            });
          }
        });
      }

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"]
  
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];
      req.token = token;
  
      jwt.verify(token, secretkey, (err, data) =>{
        if(err){
          res.status(401).send({
            result: "token is not valid",
          });
        }else{
          req.user = data;
          // chack in
          next()
        }
      })
    } else {
      res.status(400).send({
        result: "token is not found",
      });
    }
  };


  const post = (req, res) =>{
    res.send(new Array(50))

  }
  const profile = (req, res) =>{
    res.json(req.user)

  }


export {
  login,verifyToken,profile,post
};