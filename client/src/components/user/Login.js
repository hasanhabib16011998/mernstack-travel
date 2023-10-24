import {Button,IconButton,DialogContent,DialogContentText,DialogActions,DialogTitle,TextField} from "@mui/material";
import {useValue} from "../context/ContextProvider";
import {useState,useRef,useEffect} from 'react';
import {Close,Send} from '@mui/icons-material'
import Dialog from '@mui/material/Dialog';
import PasswordField from './PasswordField';
import {login,register} from '../actions/user';
import { ToastContainer,toast } from 'react-toastify';


const Login=()=>{
    let {state:{openLogin, toastify_alert},dispatch}=useValue();
    const [title,setTitle]=useState('Login');
    const nameref=useRef();
    const passwordRef=useRef();
    const emailref=useRef();
    const confirmPasswordRef=useRef();
    const [isregister,setisregister]=useState(false);
    const [alertData,setalartData]=useState(null);
    const alert_msg=(msg='nothing')=>{
        console.log(msg);
        toast(msg);}
        if(toastify_alert!=null){
            alert_msg(toastify_alert);
            dispatch({type:'UPDATE_TOASTIFY_ALERT',payload:null});
        }

    const handleToastClick = () => {
        toast('This is a toast alert!');
      };


    const handleClose=()=>{
        console.log("close login");
        dispatch({type:'CLOSE_LOGIN'});
        
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const email=emailref.current.value;
        const password=passwordRef.current.value;
        if(!isregister){
            console.log("login");
            return login({email,password},dispatch);
        }

        const name=nameref.current.value;
        const confirmPassword=confirmPasswordRef.current.value;

        if(password!==confirmPassword){
            console.log("not matched");
            alert_msg('Password is not same.')
            return dispatch({type:'UPDATE_ALERT',
            payload:{open:true,severity:'error',message:"Password doesn't match"}})
        }
        let data;
        try {
          data = await register({ name, email, password }, dispatch,setisregister);
          console.log(data);
        } catch (error) {
          console.error('Error during registration:', error);
        }
        
        if (data && data.message) {
          console.log(data.message);
          alert_msg(data.message);
        }
        console.log('register called');
    }

    useEffect(()=>{
        isregister?setTitle('Register'):setTitle('Login');
    },[isregister])

    return(
        <>
        <Dialog open={openLogin} onClose={handleClose}>
            <DialogTitle>
                {title}
                <IconButton onClick={handleClose} sx={{position:'absolute', color:(theme)=>theme.palette.grey[500]}}>
                    <Close/>
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent deviders>
                    <DialogContentText>
                        Please fill out the information in the fields below
                    </DialogContentText>
                    {
                        isregister && (
                            <TextField
                            autoFocus
                            margin="normal"
                            variant="standard"
                            id="name"
                            label="Name"
                            type="text"
                            fullwidth
                            nameref={nameref}
                            inputRef={nameref}
                            inputProps={{minLength:2}}
                            required/>
                        )}

                        <TextField
                        autoFocus={!isregister}
                        margin="normal"
                        variant="standard"
                        id="email"
                        label="Email"
                        type="Email"
                        sx={{width:'100%'}}
                        fullwidth
                        inputRef={emailref}
                        inputProps={{minLength:2}}
                        required/>

                        

                        <PasswordField
                        {...{passwordRef}}/>

                        {isregister &&(
                        <PasswordField
                        passwordRef={confirmPasswordRef}
                        id="confirmPassword"
                        label="Confirm password"

                        />)}
                        <Button onClick={handleToastClick}>Show Toast</Button>
                    
                </DialogContent>
                <DialogActions sx={{px:'19px'}}>
                    <Button type="submit" variant="outlined" endIcon={<Send/>}>
                        Submit
                    </Button>
                </DialogActions>
            </form>
            <DialogActions sx={{justifyContent:'left',p:'5px 24px'}}>
                {isregister? 'Do you have an acount? Sign in now.':"Don't have an account? Create one now"}
                <Button onClick={()=>setisregister(!isregister)}>
                    {isregister? 'Login':'Register'}
                </Button>
            </DialogActions>

        </Dialog>
        <ToastContainer/>
        <Button onClick={handleToastClick}>Show Toast</Button>
        </>
    )

}

export default Login;