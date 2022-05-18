import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import EditMenu from '../EditMenu/EditMenu'
import DeleteMenu from '../DeleteMenu/DeleteMenu'



export default function ViewInventory() {

    const [inventory, setInventory] = useState([])


    const getInventoryItems = async () => {
        try {
            const items = await axios.get('http://localhost:7000/api/inventory',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
            setInventory([
                ...items.data
            ])
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        getInventoryItems()
    }, [])


    //model controller Edit
    const [open, setOpen] = React.useState(false);
    const [modelInfo, setModelInfo] = useState([])
    const handleOpen = (item) => {
        setOpen(true);
        setModelInfo(item)
    }

    //model controller Delete
    const [openDelete, setOpenDelete] = useState(false)
    const [modelInfoDelete, setModelInfoDelete] = useState([])

    const handleOpenDelete = (item) => {
        setOpenDelete(true);
        setModelInfoDelete(item)
    }



    return (
        <Paper style={{ maxHeight: 700, overflow: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

            <EditMenu open={open} setModel={setOpen} modelInfo={modelInfo} setNewList={setInventory} />

            <DeleteMenu open={openDelete} setModel={setOpenDelete} modelInfo={modelInfoDelete} setNewList={setInventory} />

            {inventory.map((item, index) => {
                return (
                    <Card sx={{ minWidth: 345, margin: '0.5rem' }} key={index}>

                        <CardContent>

                            <Typography style={{ margin: '5px', }} variant="subtitle2" component="div">
                                Item Name: {item.Item_Name}
                            </Typography>

                            <Divider />

                            <Typography style={{ margin: '5px' }} variant="body2" color="text.secondary">
                                Quantity: {item.Quantity}
                            </Typography>

                            <Divider />

                            <Typography style={{ margin: '5px' }} variant="body2" color="text.secondary">
                                Description: {item.Item_Description}
                            </Typography>


                        </CardContent>

                        <CardActions>
                            <Button size="small" onClick={() => { handleOpen(item) }}>Edit</Button>
                            <Button size="small" onClick={() => { handleOpenDelete(item) }}>Delete</Button>
                        </CardActions>




                    </Card>

                )



            })}




        </Paper>


    )
}
