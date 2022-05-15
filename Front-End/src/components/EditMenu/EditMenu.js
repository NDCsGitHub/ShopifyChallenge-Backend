import React, {useState, useEffect} from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import Button from '@mui/material/Button';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  




  
export default function EditMenu({ open, setModel, modelInfo, setNewList}) {


    const [newItemInfo, setNewItemInfo] = useState({
        Item_Name:'',
        Quantity:'',
        Item_Description:'',
    })
  
    function handleItemInfo(e){
        const inputValue = e.target.value
        const inputName = e.target.name
        setNewItemInfo({
            ...newItemInfo,
            [inputName]:inputValue,
        })
    }

    const handleClose = () => setModel(false);


    const handleEditSubmit = async(id) => {

        const paramsNewItem = new URLSearchParams()
        for(const key in newItemInfo){
            paramsNewItem.append(key, newItemInfo[key])
          }
    
        try{
            const editResp = await axios.put(`http://localhost:5000/api/inventory/${id}`,
                paramsNewItem,
                {
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded',
                    }
                }
            
            )
            
            setNewList([
                ...editResp.data.newList
            ])
            setModel(false)
        }catch(error){
            alert(error.response.data.message)       
        }
    }



    useEffect(()=>{
        setNewItemInfo({
            Item_Name:modelInfo.Item_Name,
            Quantity:modelInfo.Quantity,
            Item_Description:modelInfo.Item_Description,
        })
    },[open])


  return (

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>


            <TextField sx={{margin:'5px'}} 
                label="Item Name"
                name='Item_Name' 
                variant="outlined" 
                defaultValue={modelInfo.Item_Name}
                onChange={(e)=>{
                    handleItemInfo(e)
                }}
            />


            <TextField sx={{margin:'5px'}} 
                label="Quanity" 
                name="Quantity"
                variant="outlined"
                defaultValue={modelInfo.Quantity}
                onChange={(e)=>{
                    handleItemInfo(e)
                }} 
            />

            <TextField sx={{margin:'5px'}} 
                label="Item Description" 
                name='Item_Description'
                variant="outlined" 
                defaultValue={modelInfo.Item_Description}
                onChange={(e)=>{
                    handleItemInfo(e)
                }}
            />

            <Button
            
                size="small" 
                onClick={() => {
                    handleEditSubmit(modelInfo._id)
                }}
            
            > 
                
                Submit 

            </Button>

        </Box>
      </Modal>

  )
}
