import {Backdrop,CircularProgress} from '@mui/material';
import React,{useState} from 'react';

const Loading=({loading,setloading})=>{
    return(
        <Backdrop open={loading} sx={{zIndex:(theme)=>theme.zIndex.modal+1}} onClick={()=>{setloading(false)}}>
            <CircularProgress sx={{color:'white'}}/>
        </Backdrop>
    )
}
export default Loading;