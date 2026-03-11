import express from "express";

const app=express();
const port=3000;

app.get("/", (req,res)=>{
    res.send("Hello from the Cars API");
});

app.get("/api/v1/cars",(req,res)=>{
    res.send("All Cars");
});

app.post("/api/v1/cars",(req,res)=>{
    //extract fields from req.body and validate and insert into database
    res.send("New Car");
});

//api/v1/cars/5123, dynamic route
app.put("/api/v1/cars/:id",(req,res)=>{
    res.send("Update a car");
});

app.delete("/api/v1/cars/:id",(req,res)=>{
    res.send("Delete a car");
});

app.get("/api/v1/cars/:id",(req,res)=>{
    res.send("Get a car");
});

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
});