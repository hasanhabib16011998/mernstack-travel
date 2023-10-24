const reducer=(state,action)=>{
    switch(action.type){
        case 'OPEN_LOGIN':
            return {...state,openLogin:true}
        case 'CLOSE_LOGIN':
            return {...state,openLogin:false}
        case 'START_LOADING':
            return {...state,loading:true}
        case 'CLOSE_LOADING':
            return {...state,loading:false}
        case 'UPDATE_USER':
            //localStorage.setItem('currentUser',JSON.stringify(action.payload));
            console.log("payload: ",action.payload);
            console.log(state.currentUser);
            console.log("final",{...state,currentUser:action.payload})
            return{...state,currentUser:action.payload};
        case 'UPDATE_ALERT':
            return {...state,alert:action.payload}
        case 'UPDATE_TOASTIFY_ALERT':
            return {...state,toastify_alert:action.payload};
        case 'UPDATE_PROFILE':
            return {...state,profile:action.payload};

    }
}

export default reducer;