import React from 'react'
import Car from './components/Car'
import { useEffect,useState } from 'react'


function MyForm({cars,setCars}){
  const [model,setModel]=useState("");
  const [year,setYear]=useState("");
  const [make,setMake]=useState("");
  const [price,setPrice]=useState("");
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
  const newCar={
    make:make,
    model:model,
    year:Number(year),
    price:Number(price)
  };
  try{
    const res = await fetch("/api/v1/cars",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(newCar)
    })
  const savedCar=await res.json();
  setCars([...cars,savedCar]);
  setMake("")
  setModel("")
  setYear("")
  setPrice("")
  }
  catch(error){
    console.log(error);
  }}
  return (
    <form onSubmit = {handleSubmit}>
      <div>
        <label>
          Enter Make:
        </label>
        <input input="text" value={make} onChange={
          (e)=> setMake(e.target.value)
        }
        required/>
      </div>
      <div>
        <label>
          Enter Model:
        </label>
        <input input="text" value={model} onChange={
          (e)=> setModel(e.target.value)
        }
        required/>
      </div>
      <div>
        <label>
          Enter Year:
        </label>
        <input input="text" value={year} onChange={
          (e)=> setYear(e.target.value)
        }
        required/>
      </div>
      <div>
        <label>
          Enter Price:
        </label>
        <input input="text" value={price} onChange={
          (e)=> setPrice(e.target.value)
        }
        required/>
      </div>
      <div>
        <button type="submit">Add to Database</button>
      </div>
    </form>
  )
}

const App = () => {
const [cars, setCars] = useState([])
  const onDelete=async(id)=>{
  try{
      const res=await fetch(`/api/v1/cars/${id}`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"}});
      const data=await res.json();
      console.log(data)
      setCars(cars=>cars.filter(car =>car.id!==id));
  }
  catch (error){
    console.log(error)
  }
}
  const onEdit = async(id,updatedInfo)=>{
    console.log("in")
    try{
      const res = await fetch(`/api/v1/cars/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(updatedInfo)
      });
      if (res.ok){
        const updatedCar=await res.json();
        setCars((cars)=>cars.map((car)=>{
          if (car.id===id){
            return updatedCar
          }
          else{
            return car
          }
        }))
      }
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    const fetchMyCars =async ()=>{
      try{
        const res=await fetch("/api/v1/cars")
        const data=await res.json()
        setCars(data)
      }
      catch(error){
        console.error(error)
      }
    }
    fetchMyCars()
  },[]);
  console.log(cars);

  return (
    <div>
      <h1>Car store</h1>
      <MyForm cars={cars} setCars={setCars}/>
      <ul>
        {cars.map(car=>(
          <Car key={car.id} {...car} onDelete={onDelete} handleEdit={onEdit}/>
        ))}
      </ul>
    </div>
  )
}

export default App