import { IconButton,Tooltip,Avatar,Badge } from '@mui/material';
import React from 'react';
import { userValue } from '../context/ContextProvider';
import { useState } from 'react';
import { Mail,Notifications } from '@mui/icons-material';
import { Box } from '@mui/system';
import UserMenu from './UserMenu';
const UserIcons=()=>{
    const user=localStorage.getItem('currentUser');
    const [currentUser,setCurrentUser]=useState(user);
const [anchorUsermenu,setAnchorUserMenu]=useState(null);
    return(
        <Box>
            <IconButton size="large" color="inherit">
                <Badge color="error" badgeContent={5}>
                    <Mail/>
                </Badge>

            </IconButton>
            <IconButton>
            <Badge color="error" badgeContent={20}>
                    <Notifications/>
                </Badge>

            </IconButton>
            <Tooltip title="Open user setting">
                <IconButton onClick={(e)=>{setAnchorUserMenu(e.currentTarget)}}>
                    <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
                        {currentUser?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                </IconButton>
            </Tooltip>

            <UserMenu {...{anchorUsermenu,setAnchorUserMenu}}/>
        </Box>
    )
}
export default UserIcons;