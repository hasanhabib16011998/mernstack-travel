import React,{useState} from 'react';
import {Visibility,VisibilityOff} from '@mui/icons-material';
import {IconButton,InputAdornment,TextField} from '@mui/material';
export default function PasswordField({passwordRef,id="password",label='password'}){

    const [showPassword,setShowpassword]=useState(false);
    const handleClick=()=>{
        setShowpassword(!showPassword)
    }
    const handleMouseDown=(e)=>{
        e.preventDefault();
    }
    return(
        <TextField
        margin='normal'
        varient="standard"
        id={id}
        label={label}
        type={showPassword? "password":"text"}
        fullwidth
        inputRef={passwordRef}
        inputProps={{minLength:8}}
        required
        InputProps={{endAdornment:(<InputAdornment position="end">
            <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
                {showPassword? <VisibilityOff/>:<Visibility/>}

            </IconButton>
        </InputAdornment>)}}/>

    )
}