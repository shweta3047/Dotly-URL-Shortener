import React, { useContext } from 'react'
import '../stylesheets/navbar.css'
import {UserContext} from '../App';
import {useHistory,Link} from 'react-router-dom'

const Navbar = () => {
    const history=useHistory();
    const {state,dispatch}=useContext(UserContext);

    const isAuthHandler=()=>{
        if(state){
            return (
                <>
                     <div><Link to="/history"> History</Link></div>
                     <div><Link onClick={()=>{
                         localStorage.clear();
                         dispatch({type:"CLEAR"})
                         history.push("/login")
                     }}> Logout</Link></div>  
                </>
            )
        }
        else{
            return (
                <>
                    <div><Link to="/login">Login</Link></div>
                    <div><Link to="/signup">SignUp</Link></div>
                </>
            )
        }
    }

    return (
        <>
            <div className="navContainer">
                <div className="brand"><Link to="/">Dotly</Link></div>
                <div className="navs">
                   {isAuthHandler()}
                </div>
            </div>
        </>
    )
}

export default Navbar;
