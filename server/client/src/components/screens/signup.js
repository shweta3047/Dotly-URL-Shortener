import React from 'react'
import {useHistory} from 'react-router-dom';
import Member from '../member';

const SignUp = () => {
    const history=useHistory();

    const SignupHandler=(email,password)=>{
        fetch("/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password})
          }).then(res=>res.json())
            .then(data=>{
              console.log(data)
              if(data.error)
              alert(data.error)
              else{
                alert(data.message);
                history.push("/login")
              }
            }).catch(err=>console.log(err))
    }
    return (
        <>
            <Member task="SignUp" taskFunc={SignupHandler} />
        </>
    )
}

export default SignUp;
