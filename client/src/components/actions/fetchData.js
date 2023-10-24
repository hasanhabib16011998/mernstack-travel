const fetchData=async({url,method="POST",token='',body=null},dispatch)=>{
    console.log("fetched");
    const headers=token?{
        "Content-Type":"application/json",authorization:`Bearer ${token}`
    }:{"Content-Type":'application/json'};
    body=body?{body:JSON.stringify(body)}:{};


    try{
        console.log("fetch called");
        const response=await fetch(url,{method,headers,...body});
        const data=await response.json();
        console.log("devider");
        console.log(data);

        if(!data.success){
            if(response.status===400){
                dispatch({type:'UPDATE_USER',payload:null});
                dispatch({type:'UPDATE_TOASTIFY_ALERT',payload:data.message});
                return data;
                //throw new Error(data.message);
            }
            else if(response.status===404){
                dispatch({type:'UPDATE_USER',payload:null});
                dispatch({type:'UPDATE_TOASTIFY_ALERT',payload:data.message});
                return data;
                //throw new Error(data.message);
            }
        }
        return data;
    }
    catch(err){
        dispatch({
            type:'UPDATE_ALERT',
            payload:{open:true,severity:'error',message:err.message}
        })
        console.log("catched")
        console.log(err.message)
        return null;
    }
}

export default fetchData;