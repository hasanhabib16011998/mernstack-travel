import React,{useState} from 'react';
import{AppBar,Box,Button,Container,IconButton,Toolbar,Typography} from '@mui/material';

import {Lock,Menu} from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useValue} from "./context/ContextProvider";
import UserIcons from './user/UserIcons';

const NavBar=()=>{
    const {state:{currentUser},dispatch}=useValue();
    return(
        <>
        <AppBar>
            <Container maxWidth='lg'>
                <Toolbar>
                <Box sx={{mr:1}}>
                    <IconButton size='large'>
                        <Menu/>
                    </IconButton>
                </Box>
                
                <Typography variant='h6' component='h1' sx={{flexGrow:1,display:{xs:'none',sm:'flex'}}}>
                    Travel Application
                </Typography>
                <Typography variant='h6' component='h1' sx={{flexGrow:1,display:{xs:'flex',sm:'none'}}}>
                    Travel App
                </Typography>

                {!currentUser?(<Button color='inherit' startIcon={<Lock/>} onClick={()=>dispatch({type:"OPEN_LOGIN"})}>Login</Button>)
                :
                (
                    <UserIcons/>

                )
                }
                </Toolbar>

            </Container>
        </AppBar>
        </>
    )
}
export default NavBar;