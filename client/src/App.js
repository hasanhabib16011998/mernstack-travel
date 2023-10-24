import React,{useState} from 'react';
//import BottomNav from './components/BottomNav';
import Loading from './components/Loading';
import NavBar from './components/NavBar';
//import Notification from './components/Notification';
//import Room from './components/rooms/Room';
import Login from './components/user/Login';


const App=()=> {
  const [loading,setloading]=useState(false);
  return (
    <>
    <NavBar setloading={setloading}/>
    <Loading loading={loading} setloading={setloading}/>
    <Login/>
    {/* <Notification/>
    <BottomNav/>
    <Room/> */}

    </>
  );
}

export default App;
