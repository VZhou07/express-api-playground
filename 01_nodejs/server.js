import http from "http";

const server=http.createServer((req,res) =>{
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end("You just built a server in Nodejs")
})

server.listen(3000,() => console.log("Hello from http://localhost:3000"));