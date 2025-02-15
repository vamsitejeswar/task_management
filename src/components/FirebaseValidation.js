import React, { useEffect, useState } from 'react';
import {auth} from './Firebase';
import UserAuth from './UserAuth';
import Home from './Home';

const FireValid = () => {
    const [presentUser,setPresentUser]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                setPresentUser({
                    uid:user.uid,
                    email:user.email
                })
            }
            else{
                setPresentUser(null);
            }
        })
    },[])
  return (
    <div>
        {presentUser ? <Home presentUser={presentUser}/>:<UserAuth/>}
    </div>
  )
}

export default FireValid