import React,{useContext} from 'react'
import {useHistory} from 'react-router-dom';
import Member from '../member';
import {UserContext} from '../../App';

const Login = () => {
    const history=useHistory();
    const {state,dispatch}=useContext(UserContext);

    const loginHandler=(email,password)=>{
        fetch("/login",{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{"Content-Type":"application/json"}
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                alert(data.error)
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                history.push("/");
            }
        })
    }
    return (
       <>
            <Member task="Login" taskFunc={loginHandler} />
       </>
    )
}

export default Login;
