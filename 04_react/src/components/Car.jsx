import { useState } from "react"
import React from 'react'

const Car = ({id,make,model,year,price, onDelete, handleEdit}) => {
  const onEdit = ()=>{
    setIsEditing(true);
    setEditMake(make);
    setEditModel(model);
    setEditPrice(price);
    setEditYear(year);
  }
  
  const [isEditing,setIsEditing] = useState(false);

  const [editMake, setEditMake] = useState("");
  const [editModel, setEditModel] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editPrice, setEditPrice] = useState("");


  return (
    (!isEditing)?(
    <div>
        <li>
            <p>Make: {make}</p>
            <p>Model: {model}</p>
            <p>Year: {year}</p>
            <p>Price: {price}</p>
        </li>
        <button onClick={()=>onEdit()}> Edit Entry</button>
        <button onClick={()=>onDelete(id)}> Delete Entry </button>
    </div>):
    <div>
      <li>
        <form onSubmit={(e)=>{
          e.preventDefault();
          const car={make:editMake,model:editModel,year:Number(editYear),price:Number(editPrice)};
          handleEdit(id,car);
          setIsEditing(false)
        }}>
          <div>
            <label>
              Make:
            </label>
            <input type="text" value={editMake} onChange={(e)=>setEditMake(e.target.value)}/>
          </div>
          <div>
            <label>
              Model:
            </label>
            <input type="text" value={editModel} onChange={(e)=>setEditModel(e.target.value)}/>
          </div>
          <div>
            <label>
              Year:
            </label>
            <input type="text" value={editYear} onChange={(e)=>setEditYear(e.target.value)}/>
          </div>
          <div>
            <label>
              Price:
            </label>
            <input type="text" value={editPrice} onChange={(e)=>setEditPrice(e.target.value)}/>
          </div>
          <button type="submit"> Save</button>
          <button type="button" onClick={()=>{
            setIsEditing(false)
          }}> Cancel</button>
        </form>
      </li>
    </div>

  )
}

export default Car