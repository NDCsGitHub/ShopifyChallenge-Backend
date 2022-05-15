import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import EditMenu from '../EditMenu/EditMenu'

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
        setInventory([
            ...items.data
        ])
    }catch(error){
        alert(error.response.data.message)
    }
  }


  const deleteItem = async (id) => {
      try{
        const deleteResp = await axios.delete(`http://localhost:5000/api/inventory/${id}`,
        {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin':'*',
            }
        })
        alert(`Item ID: ${deleteResp.data.id} removed!`)
        setInventory([
            ...deleteResp.data.newList
        ])
      }catch(error){
        alert(error.response.data.message)        
      }
  }

  useEffect(()=>{
    getInventoryItems()
  },[])


  //model controller
  const [open, setOpen] = React.useState(false);
  const [modelInfo, setModelInfo] = useState([])
  const handleOpen = (item) => {
      setOpen(true);
      setModelInfo(item)
  }



  return (
    <Paper style={{maxHeight: 700, overflow: 'auto', display:'flex', flexDirection:'row', flexWrap:'wrap'}}>

        {inventory.map((item, index) => {
            return (
                <Card sx={{ minWidth: 345, margin:'0.5rem' }}>

                    <EditMenu open={open} setModel={setOpen} item={item} modelInfo={modelInfo} setNewList = {setInventory}/>
                    
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


                    </CardContent>
            
                    <CardActions>
                        <Button size="small" onClick={()=>{handleOpen(item)}}>Edit</Button>



                        <Button 
                            size="small" 
                            onClick={() => {
                                deleteItem(item._id)
                            }}
                        >

                            Delete
                        </Button>
                    </CardActions>

                    


                </Card>

            )



        })}
    


    
    </Paper>


  )
}
