import React from 'react'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Headerbar from './components/HeaderBar/HeaderBar';
import Sidemenu from './components/Sidemenu/Sidemenu';
import { styled } from '@mui/material/styles';
import {useDashboardContext} from '../../contexts/DashboardContext'




const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    zIndex:'1',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  
  }));



export default function DashBoard() {
  
  const {sidemenuState} = useDashboardContext()

  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />


      <Headerbar/>

      <Sidemenu/>

    <Box component="main" sx={{ flexGrow: 1, p: 3, background:'rgb(246, 235, 235)', height:"100vh" }}>
      <DrawerHeader />
      
      {(()=>{

            switch(sidemenuState){

                case 'Warehouses':
                    return <h1>this is warehouse panel</h1>
                case 'All Items':
                    return <h1>All items </h1>
                case 'AddItems':
                    return <h1>Add items </h1>

            }

        })()}


    </Box>
  </Box>
  )
}
