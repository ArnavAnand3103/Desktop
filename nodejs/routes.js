const express=require("express");
const{handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById ,
    handleDeleteUserById,
    handleCreateNewUSer
}=require('../controllers/user');

const User = require("./routes/user");
const router=express.Router();
router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUSer);
// router.get("/users",async(req,res)=>{
//     const allDbUsers=await User.find({});
//     const html=`<ul> ${allDbUsers.map((user)=>`<li>${user.firstName}-${user.email}</li>`).join("")}</ul>`;
//     res.send(html);
// });

// router.get("/api/users",async (req,res)=>{
//     const allDbusers=await User.find({});
//     return res.json(allDbusers);
// });

router.route("/:id")
.get(handleGetUserById) 
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);
app.post("/",handleCreateNewUSer);
module.exports=router;


