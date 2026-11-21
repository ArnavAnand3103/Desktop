
// //Schema
// const userSchema=new mongoose.Schema({

//   firstName:{
//     type:String,
//     required:true,
//   } ,
//   lastName:{
//     type:String,
//   },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//     },
//     jobTitle:{
//         type:String,
//     },
//     gender:{
//         type:String,
//     },
// },{
//     timestamps:true,    }
// );

//     const User=mongoose.model('user',userSchema);
// //Middleware-pluggin
// app.use(express.urlencoded({extended:false}));


// app.use((req,res,next)=>{
//     fs.appendFile('log.txt',
//         `\n${Date.now()}:${req.ip} ${req.method}:${req.path}\n`,(err,data)=>{
//         next();
//     })

//   console.log("Hello from Middleware1");
// //   req.myUserName="piyushgarg.dev";
// //   return res.json({mgs:"Hello from middleware 1"});


// });
// // app.use((req,res,next)=>{
// //   console.log("Hello from Middleware2",req.myUserName);
//   //db query
//   //credit card info
// //   req.creditCardNumber='123';

// //   return res.json({mgs:"Hello from middleware 1"});
// // return res.end('Hey');
// // next();
// // });


// //Routes

// app.get("/users", async (req, res) => {
//   const allDbUsers = await User.find({});

//   // const html = `
//   //   <ul>
//   //     ${allDbUsers
//   //       .map(user => `<li>${user.firstName} - ${user.email}</li>`)
//   //       .join("")}
//   //   </ul>
//   // `;

//   return res.send(html);
// });

// //REST API
// app.get("/api/users/",(req,res)=>{
//     // console.log("I am in get route",req.myUserName);
//     //  res.setHeader("X-MyName","Piyush Garg");//custom header
//     //always add X to custom header
//     console.log(req.headers)
//     return res.json(users);
// });
// app.route('/api/users/:id').get(async(req,res)=>{
//     // const id=Number(req.params.id);
    
//     // const user=users.find((user)=>user.id===id);
//     const user=await user.findById(req.params.id);
//     if(!user)    return res.status(404).json({status:"failure",msg:'User not found'});
//     return res.json(user);
// }).patch(async(req,res)=>{
//   await User.findByIdAndUpdate(req.params.id,{lastName: "Changed"});
//   return  res.json({status:"Success"});
  
// })
// .delete((req,res)=>{
//      return  res.json({status:"Pending"});
// })



// // app.post('/api/users',async(req,res)=>{
// //     const body=req.body;
// //     if(!body||!body.first_name||!body.last_name||!body.email){
// //         return res.status(400).json({status:"failure",msg:'All fields are required'});
// //     }
// //     // users.push({...body,id:users.length+1});
// //     // fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
// //     // return res.status(201).json({status:"success'",id:users.length});
// //     // });
// //     //console.log("Body",body);
// //     const result=await User.create({
// //         firstName:body.first_name,
// //         lastName:body.last_name,
// //         email:body.email,
// //         jobTitle:body.job_title,
// //         gender:body.gender,
// //     });
// //     console.log("result",result);
// //     return res.status(201).json({msg:"success"});
   
// // });
// app.post("/api/users", async (req, res) => {
//   try {
//     const body = req.body;

//     if (!body || !body.first_name || !body.last_name || !body.email) {
//       return res.status(400).json({
//         status: "failure",
//         msg: "All fields are required",
//       });
//     }

//     const result = await User.create({
//       firstName: body.first_name,
//       lastName: body.last_name,
//       email: body.email,
//       jobTitle: body.job_title,
//       gender: body.gender,
//     });

//     return res.status(201).json({
//       status: "success",
//       data: result,
//     });

//   } catch (err) {
//     // 🔥 duplicate key error
//     if (err.code === 11000) {
//       return res.status(409).json({
//         status: "failure",
//         msg: "Email already exists",
//       });
//     }

//     // fallback
//     return res.status(500).json({
//       status: "error",
//       msg: "Internal Server Error",
//     });
//   }
// });