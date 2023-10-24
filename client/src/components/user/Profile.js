import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,IconButton} from '@mui/material';
import { useValue } from '../context/ContextProvider';
import React,{useRef} from 'react';
import {updateProfile} from '../actions/user';
import {TextField,Avatar,Button} from '@mui/material';
import { Close,Send } from '@mui/icons-material';
const Profile=()=>{
    const {state:{profile,currentUser},dispatch}=useValue();
    const nameRef=useRef();
    const handleClose=()=>{
        dispatch({type:"UPDATE_PROFILE",payload:{...profile,open:false}})
    };
    const handleChange=(e)=>{
        const file=e.target.files[0];
        if(file){
            const photoURL=URL.createObjectURL(file);
            console.log(photoURL);
            dispatch({type:"UPDATE_PROFILE",payload:{...profile,file,photoURL}});
        }

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const name=nameRef.current.value;
        updateProfile(currentUser,{name:name,file:profile.file},dispatch);
    }

    return(
        <Dialog open={profile.open} onClose={handleClose}>
            <DialogTitle>
                Profile
            <IconButton
            sx={{
                position:'absolute',
                top:8,
                right:8,
                color:(theme)=>theme.palette.grey[500],
            }}
            onClick={handleClose}>
                <Close/>
            </IconButton>
            </DialogTitle>
        <form onsubmit={handleSubmit}>
            <DialogContent deviders>
                <DialogContentText>
                    You can update your profile by updating these fields
                </DialogContentText>

                <TextField
                autofocus
                margin="normal"
                varient="standard"
                id="name"
                label="name"
                type="text"
                fullWidth
                inputRef={nameRef}
                inputProps={{minLength:2}}
                required
                defaultValue={currentUser?.name}
                />
                <label HtmlFor="profilePhoto">
                    <input accept="image/"
                    id="profilePhoto"
                    type="file"
                    style={{display:"none"}}
                    onChange={handleChange}
                    />
                    <Avatar src={profile.photoURL}
                    sx={{width:75,height:75,cursor:"pointer"}}/>
                </label>
            </DialogContent>

            <DialogActions sx={{px:'19px'}}>
                <Button type="submit" varient="contained" endIcon={<Send/>}>
                    Update
                </Button>
            </DialogActions>
        </form>

        </Dialog>
    )
}
export default Profile;