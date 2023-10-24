import React from "react";
import { Settings,Logout } from "@mui/icons-material";
import { ListItemIcon,Menu,MenuItem } from "@mui/material";
import { useValue } from '../context/ContextProvider';
import Profile from "./Profile";


const UserMenu=({anchorUsermenu,setAnchorUserMenu})=>{
    //useCheckToken();
    const {dispatch,state:{currentUser}}=useValue();
    const handleClose=()=>{
        setAnchorUserMenu(null)
    }

    return(
        <>
        <Menu anchorE1={anchorUsermenu}
        open={Boolean(anchorUsermenu)} 
        onClose={handleClose} 
        onClick={handleClose}>
            <MenuItem onClick={()=>{dispatch({type:"UPDATE_PROFILE",payload:{open:true,file:null,photoURL:currentUser?.photoURL}})}}>
                <ListItemIcon>
                    <Settings fontSize="small"/>
                </ListItemIcon>
                Profile
            </MenuItem>

            <MenuItem onClick={()=>{dispatch({type:"UPDATE_USER",payload:null})}}>
                <ListItemIcon>
                    <Logout fontSize="small"/>
                </ListItemIcon>
                Logout
            </MenuItem>

        </Menu>
        <Profile/>
        </>
    )

}

export default UserMenu;