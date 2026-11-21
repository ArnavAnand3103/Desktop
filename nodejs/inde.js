const http=require('http');
const fs=require('fs');
const url=require('url');
const express=require("express");

const app=express();
app.get("/",(req,res)=>{
    return res.send("Hello From Home Page");
});
app.get("/about",(req,res)=>{
    return res.send("Hello FromAbout Page"+"hey"+req.query.name+" you are "+req.query.age);
});

function myHandler(req,res){


    const log=`${Date.now()}:${req.method}${req.url}New Req Received\n`;
    const myUrl=url.parse(req.url,true );

    console.log(myUrl);
    fs.appendFile("log.txt",log,(err,data)=>{
        res.end("Hello From Server Again");
        switch(req.url){
            case '/':
                if(req.method==='GET') res.end("Home Page");
                break;
                res.end("Home Page");                   

                break;
            case '/about':
                res.end("About Page");
                break;
            case '/contact':
                res.end("Contact Page");
                break;
                case"/search":
                constsearch=myUrl.query.search_query;
                res.end("Here are your results for "+search);
                case "/signup":
                    if(req.method==='GET') res.end("This is signup Form");
                    else if (req.method==='POST')
{
    res.end("Success");
}            default:
                res.end("404 Page Not Found");
                break;
        }   
    });
    console.log("New Req Rec.");
    res.end("Hello from server");

};
const myServer=http.createServer(myHandler);



myServer.listen(8000,()=>console.log("Server Started!"));

