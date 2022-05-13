import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios'





export default function AddItem() {



  const [itemInfo, setItemInfo] = useState({
      Item_Name:'',
      Quantity:'',
      Item_Desccription:'',
  })

  function handleItemInfo(e){
      const inputValue = e.target.value
      const inputName = e.target.name
      setItemInfo({
          ...itemInfo,
          [inputName]:inputValue,
      })
  }

  const handleSubmit=async()=>{
    const paramsNewItem = new URLSearchParams()
    for(const key in itemInfo){
        paramsNewItem.append(key, itemInfo[key])
      }

    try{
        const resp = await axios.post('http://localhost:5000/api/inventory', paramsNewItem,
            {

                headers:{
                    'Content-Type':'application/x-www-form-urlencoded',
                }

            })
            
            
        // addd check for error
        console.log(resp.data)
    }catch(error){
        console.log(error)
    }


  }


  return (

    <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <TextField sx={{margin:'5px'}} 
                label="Item Name"
                name='Item_Name' 
                variant="outlined" 
                onChange={(e)=>{
                    handleItemInfo(e)
                }}
            />


            <TextField sx={{margin:'5px'}} 
                label="Quanity" 
                name="Quantity"
                variant="outlined"
                onChange={(e)=>{
                    handleItemInfo(e)
                }} 
            />


            <TextField sx={{margin:'5px'}} 
                label="Item Description" 
                name='Item_Description'
                variant="outlined" 
                onChange={(e)=>{
                    handleItemInfo(e)
                }}
            />

        </CardContent>

        
        <CardActions>
            <Button size="small" onClick={()=>{
                handleSubmit()
            }}>
                Submit
            </Button>
        </CardActions>
    </Card>



  )
}
