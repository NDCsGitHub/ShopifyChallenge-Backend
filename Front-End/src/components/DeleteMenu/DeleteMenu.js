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
  
export default function DeleteMenu({ open, setModel, modelInfo, setNewList}) {


    const [deleteComment, setDeleteComment] = useState('')

    const deleteItem = async (id) => {

        try{
          const deleteResp = await axios.delete(`http://localhost:5000/api/inventory/${id}`,{
              data:{
                Item_Name:modelInfo.Item_Name,
                Quantity:modelInfo.Quantity,
                Item_Description:modelInfo.Item_Description,
                Delete_Comments:deleteComment,
              }
          },
          {
              headers:{
                  'Content-Type':'application/x-www-form-urlencoded',
                  'Access-Control-Allow-Origin':'*',
              }
          })

          alert(`Item ID:${deleteResp.data.id} removed! ------Item Info:${JSON.stringify(deleteResp.data.itemDeleted)}`)
          

          setNewList([
              ...deleteResp.data.newList
          ])

          setDeleteComment('')

          setModel(false)
          
        }catch(error){
          alert(error.response.data.message)        
        }
    }

    const handleClose = () => setModel(false);

    useEffect(()=>{
        console.log(modelInfo)
    },[modelInfo])

  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
    
        <TextField sx={{margin:'5px'}} 
            label="Delete Comment"
            rows={4}
            variant="outlined" 
            value={deleteComment}
            multiline
            onChange={(e)=>{
                setDeleteComment(e.target.value)
            }}
        />

        <Button
            size="small" 
            onClick={() => {
                deleteItem(modelInfo._id)
            }}
        > 
            Delete Now!
        </Button>

    </Box>
  </Modal>
  )
}
