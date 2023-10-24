import fetchData from "./fetchData";
import { UploadFile } from "@mui/icons-material";
import { v4 as uuidv4 } from 'uuid';
import uploadFile from "../firebase/uploadFile";


const url="http://localhost:5000/user"

export const register=async(user,dispatch,setisregister)=>{
    console.log("register");
    dispatch({type:'START_LOADING'})
    const result=await fetchData({url:url+'/register',body:user},dispatch);
    if(result){
        console.log(result);
        dispatch({type:'UPDATE_USER',payload:result})
        result?.success? setisregister(false):console.log('got success=false');
        dispatch({type:'UPDATE_ALERT',payload:{
            open:true,severity:'success',message:"Your account has been created successfully."
        }})
    }
    dispatch({type:"CLOSE_LOADING"});
}

export const login=async(user,dispatch)=>{
    dispatch({type:'START_LOADING'})
    const res=await fetchData({url:url+'/login',body:user},dispatch);
    console.log(res);
    if(res?.success== false){
        dispatch({type:'UPDATE_TOASTIFY_ALERT',payload:res.message});
    }
    if(res?.success==true){
        dispatch({type:'UPDATE_TOASTIFY_ALERT',payload:'Log In successfull! Welcome.'});
        dispatch({type:'UPDATE_USER',payload:res?.result});
        console.log("Log In successful");
        dispatch({type:'CLOSE_LOGIN'});
    }
    dispatch({type:"CLOSE_LOADING"});
}

export const updateProfile=async(currentUser,updatedFields,dispatch)=>{
    dispatch({type:'START_LOADING'});
    const {name,file}=updatedFields;
    let body={name};
    try{
        if(file){
            const imageName=uuidv4()+'.'+file?.name?.split('.')?.pop();
            const photoURL=await UploadFile(
                file,`profile/${currentUser?.id}/${imageName}`
            )
            body={...body,photoURL}
        }
        const result=await fetchData({url:url+'updateProfile',method:'PATCH',body,token:currentUser.token},dispatch)
        if (result){
            console.log("user: ",currentUser,result);
            dispatch({type:'UPDATE_USER',payload:{...currentUser,...result}});
            // dispatch({type:'UPDATE_ALERT',payload:{
            //     open:true,
            //     severity:'success',
            //     message:'Your profile image has been updated successfully'
            // }});
            dispatch({type:'UPDATE_PROFILE',payload:{open:false,file:null,photoURL:result.photoURL}})
        }
    }
    catch(error){
        dispatch({type:'UPDATE_ALERT',payload:{
            open:true,
            severity:'error',
            message:error.message
        }})
    }
    dispatch({type:'CLOSE_LOADING'})
}