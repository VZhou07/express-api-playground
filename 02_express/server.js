import express from "express";

const app=express();
const port=3000;

const router=express.Router();

app.use(express.json());

let cars=[
    {id:0, make:"Toyota",model:"Camry", year:2022, price:20000},
    {id:1, make:"Tesla",model:"X", year:2023, price:25000},
    {id:2, make:"Ford",model:"F150", year:2025, price:40000}
];


app.get("/", (req,res)=>{
    res.send("Hello from the Cars API");
});

router.get("/",(req,res)=>{
    res.json(cars)
});

router.get("/:id",(req,res)=>{
    const id=req.params.id
    const car=cars.find((car)=>car.id==id);

    if (!car) return res.status(404).send("Car not found")
    res.json(car)
});


router.post("/",(req,res)=>{
    //extract fields from req.body and validate and insert into database
    const info=req.body
    if (!(info.make) || !(info.model) || !(info.year) || !(info.price)){
        return res.status(400).send("No data");
    }
    const newCar={
        id:cars.length,
        make:info.make,
        model:info.model,
        year:info.year,
        price:info.price
    }
    cars.push(newCar)
    return res.json(cars)
});

router.put("/:id",(req,res)=>{
    const info=req.body
    const id=req.params.id
    const a=cars.find((car)=> car.id==id)
    if (!a)
    {
        return res.status(404).send("bad id")
    }
    const make=info.make
    const model=info.model
    const price=info.price
    const year=info.year
    a.make= make ? make:a.make
    a.model= model? model:a.model
    a.year= year ? year:a.year
    a.price= price? price:a.price
    res.json(cars)
});

router.delete("/:id",(req,res)=>{
    const id=req.params.id
    const index=cars.findIndex((car)=>id==car.id)
    if (index===-1){
        return res.status(404).send("Invalid Id")
    }
    cars.splice(index,1)
    return res.json(cars)
});


app.use("/api/v1/cars",router)

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
});