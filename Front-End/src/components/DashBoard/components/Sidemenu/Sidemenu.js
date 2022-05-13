/* eslint-disable default-case */
import React from 'react'
import './sidemenu.css'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme} from '@mui/material/styles';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiDrawer from '@mui/material/Drawer';
import {useDashboardContext} from '../../../../contexts/DashboardContext'
import Home from '@mui/icons-material/Home';
import Order from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';

const drawerWidth = 260;



const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    zIndex: '0',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );




  const sidemenuButton = ['Warehouses','All Items'];

    

export default function Sidemenu() {


  //Dashboard Context
  const {open, setOpen, handleSidemenuState,} = useDashboardContext()
  const theme = useTheme();




  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (
    <Drawer variant="permanent" open={open}>

        <DrawerHeader>

          <div className='toolTitle'>Shopify Inventory Tool</div>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>


        <Divider />


        <List>
          {sidemenuButton.map((text, index) => (

            
                <ListItemButton
                    key={index}
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                    textcontent={text}
                    onClick={()=>{
                        handleSidemenuState(text)
                    }}
                >

                        <ListItemIcon
                            sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            }}
                        >
                            {(()=>{
                                switch(index){
                                    case 0:
                                        return <Home fontSize="large" />
                                    case 1:
                                        return <CategoryIcon fontSize="large" />
                                }
                            })()}
                        </ListItemIcon>

                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                    
                </ListItemButton>
                
          ))}
        </List>



        <Divider />



        <List className='sidemenuBottomList'>
            <div>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        
                    }}
                    onClick={()=>{
                        handleSidemenuState('AddItems')
                    }}
                    >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <AddShoppingCartIcon fontSize="large" sx={{ color: 'white', background:'#ff928b',borderRadius:'5px', padding:'5px'}}/>
                    </ListItemIcon>
                    <ListItemText primary={'Add Item to Inventory'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>

            </div>
        </List>


      </Drawer>
  )
}
