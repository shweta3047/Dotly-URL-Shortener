import React, { useContext } from 'react'
import '../stylesheets/navbar.css'
import {UserContext} from '../App';
import {useHistory} from 'react-router-dom'

const Navbar = () => {
    const history=useHistory();
    const {state,dispatch}=useContext(UserContext);

    const isAuthHandler=()=>{
        if(state){
            return (
                <>
                     <div><a href="/history"> History</a></div>
                     <div><a href="/logout" onClick={()=>{
                         localStorage.clear();
                         dispatch({type:"CLEAR"})
                         history.push("/login")
                     }}> Logout</a></div>  
                </>
            )
        }
        else{
            return (
                <>
                    <div><a href="/login">Login</a></div>
                    <div><a href="/signup">SignUp</a></div>
                </>
            )
        }
    }

    return (
        <>
            <div className="navContainer">
                <div className="brand"><a href="/">Dotly</a></div>
                <div className="navs">
                   {isAuthHandler()}
                </div>
            </div>
        </>
    )
}

export default Navbar;
