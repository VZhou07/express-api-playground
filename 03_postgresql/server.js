import express from "express";
import { cars } from "./schema.js";
import {db} from "./db.js"
import {eq} from "drizzle-orm"

const app=express();
const port=3000;

const router=express.Router();

app.use(express.json());


app.get("/", (req,res)=>{
    res.send("Hello from the Cars API");
});

router.get("/",async(req,res)=>{
    const newCars= await db.select().from(cars);
    return res.json(newCars)
});

router.get("/:id",async(req,res)=>{
    const id = parseInt(req.params.id);
    const [car]=await db.select().from(cars).where(eq(cars.id,id));
    if (!car){
        return res.status(400).send("Id does not exist");
    }
    res.status(200).send(car);
});


router.post("/",async(req,res)=>{
    //extract fields from req.body and validate and insert into database
    const info=req.body
    if (!(info.make) || !(info.model) || !(info.year) || !(info.price)){
        return res.status(400).send("No data");
    }
    const [newCar] = await db.insert(cars).values({
        make: info.make,
        model: info.model,
        year: info.year,
        price: info.price
    }).returning();
    return res.json(newCar);
});

router.put("/:id",async(req,res)=>{
    const id=parseInt(req.params.id);
    const info=req.body;
    const [car]=await db.select().from(cars).where(eq(cars.id,id))
    if (!car) return res.status(400).send("bad id")
    
    const [newCar]=await db.update(cars).set({
        "make": info.make ? info.make:car.make,
        "year":info.year? info.year:car.year,
        "price":info.price?info.price:car.price,
        "model":info.model?info.model:car.model
    }).where(eq(cars.id,id)).returning();
    return res.status(200).json(newCar);
});

router.delete("/:id",async(req,res)=>{
    const id = parseInt(req.params.id);
    const [car]=await db.select().from(cars).where(eq(cars.id,id))
    if (!car) return res.status(400).send("bad id")
    const [newCar]=await db.delete(cars).where(eq(cars.id,id)).returning()
    return res.status(200).json(newCar)

});


app.use("/api/v1/cars",router);

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
});