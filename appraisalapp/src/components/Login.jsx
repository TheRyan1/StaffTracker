import React from 'react'
import {useAuth0} from '@auth0/auth0-react'


function Login() {
    const { loginWithRedirect } = useAuth0();
    return (
        <div className="loginPage">
       <h2>Staff Tracker</h2>
         <button  onClick={()=>{
             loginWithRedirect()
         }}>Login</button>   
      </div>
    )
}

export default Login
