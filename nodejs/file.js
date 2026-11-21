const fs=require('fs');
fs.writeFileSync("./test.txt","Hey There");
fs.writeFile("./test2.txt","Hello World Async",(err)=>{})

const r=fs.readFile("./contacts.txt","utf-8",(err,result)=>{
    if(err){
        console.log("Error",err);
    }else{
        console.log(result);
    }

});

fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());
fs.appendFileSync("./test.txt",`${Date.now()} Hey There\n`);
fs.unlinkSync("./copy.txt");
const result=fs.readFileSync('contacts.txt',"utf-8");
console.log(result);


