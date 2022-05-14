import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';




export default function ViewInventory() {


  const [inventory, setInventory] = useState([])

  const getInventoryItems = async () => {
    
    try{
        const items = await axios.get('http://localhost:5000/api/inventory',
        {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            }
        })

        console.log(items.data)

    }catch(error){
        alert(error.response.data.message)
    }

  }


  useEffect(()=>{
    getInventoryItems()
  },[])

  useEffect(()=>{
      console.log(inventory)
  },[inventory])

  return (



    <Card sx={{ maxWidth: 345 }}>
      <CardContent>

        <Typography gutterBottom variant="h5" component="div">
            Item Name
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Item Quantity
        </Typography>

      </CardContent>

      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  )
}
