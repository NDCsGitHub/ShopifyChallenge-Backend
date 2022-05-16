import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';




export default function ViewInventory() {

  const [inventory, setInventory] = useState([])


  const getInventoryItems = async () => {
    try{
        const items = await axios.get('http://localhost:5000/api/deleteditems',
        {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            }
        })
        setInventory([
            ...items.data
        ])
    }catch(error){
        alert(error.response.data.message)
    }
  }

  useEffect(()=>{
    getInventoryItems()
  },[])

  
  const undelete = async(item)=>{
      
    try{
        const undeletedItem =  await axios.delete(`http://localhost:5000/api/deleteditems/${item._id}`,{
            data:{
                Item_Name:item.Item_Name,
                Quantity:item.Quantity,
                Item_Description:item.Item_Description,
            }
        },{
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin':'*',
            }
        })  

        alert(`item undeleted!, it is now in inventory`)
        setInventory([
            ...undeletedItem.data.newList
        ])

    }catch(error){
        alert(error.response.data.message)
    }




  }










  return (
    <Paper style={{maxHeight: 700, overflow: 'auto', display:'flex', flexDirection:'row', flexWrap:'wrap'}}>

        {inventory.map((item, index) => {
            return (
                <Card sx={{ minWidth: 345, margin:'0.5rem' }} key={index}>

                    <CardContent>
            
                    <Typography style={{margin:'5px',}}  variant="subtitle2" component="div">
                        Item Name: {item.Item_Name}
                    </Typography>

                    <Divider/>
            
                    <Typography style={{margin:'5px'}}   variant="body2" color="text.secondary">
                        Quantity: {item.Quantity}
                    </Typography>

                    <Divider/>

                    <Typography style={{margin:'5px'}} variant="body2" color="text.secondary">
                        Description: {item.Item_Description}
                    </Typography>

                    <Divider/>

                    <Typography style={{margin:'5px'}} variant="body2" color="text.secondary">
                        Reason for Delete: {item.Delete_Comments}
                    </Typography>

                    </CardContent>
            
                    <CardActions>
                        <Button size="small" onClick={()=>{ undelete(item) }}>Undelete</Button>
                    </CardActions>

                    


                </Card>

            )



        })}
    
    </Paper>


  )
}
