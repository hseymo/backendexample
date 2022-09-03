const express = require("express");
const router = express.Router();
const {User,Blog} = require("../models/");
const bcrypt  = require("bcrypt");

//find all
router.get("/", (req, res) => {
  User.findAll({
    include:[Blog]
  })
    .then(dbUsers => {
      res.json(dbUsers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
router.get("/logout",(req,res)=>{
  req.session.destroy();
  res.redirect("/")
})

//find one
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id,{})
    .then(dbUser => {
      if (!dbUser[0]){
        res.status(404).json({msg:"error", err:err})
      }
      res.json(dbUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//create user
router.post("/", async (req, res) => {
  try {
    const userData = await User.cerate(req.body);
    res.status(200).json(userData)
  } catch {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  }
});

// login
router.post("/login", (req, res) => {
  User.findOne({
    where:{
    username:req.body.username
  }
}).then(foundUser=>{
    if(!foundUser){
      // want generic 400 level errors to not give hackers info
      return res.status(400).json({msg:"wrong login credentials"})
    }
    if(bcrypt.compare(req.body.password, dbUser.password)){
      return res.json(dbUser)
    } else {
      return res.status(400).json({msg:"wrong login credentials"})
    }
  }).catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//update user
router.put("/:id", async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true
    });
    if (!userData[0]) {
      res.status(404).json({msg:"error", err:err})
    }
  } catch {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  }
});

//delete a user
// router.delete("/:id", (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(delUser => {
//     res.json(delUser);
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({ msg: "an error occured", err });
//   });
// });


module.exports = router;
