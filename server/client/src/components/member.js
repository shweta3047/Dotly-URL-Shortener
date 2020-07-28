import React,{useState} from 'react';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Member=(props)=>{

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    return (
        <>
        <div className="memberContainer">
            <div className="userImg"><AccountCircleIcon  style={{color:"#185413",fontSize:"7rem"}}/></div>
            <div className="userInput">
                <div className="email">
                    <div className="emailIcon"><EmailIcon style={{color:"#185413",fontSize:"2rem"}} /></div>
                    <input type="email" placeholder="Email" name="email" value={email} onChange={e=>setEmail(e.target.value)} />
                </div>
                <div className="password">
                    <div className="passIcon"><LockIcon style={{color:"#185413",fontSize:"2rem"}}/></div>
                <input type="password" placeholder="Password" name="password" value={password} onChange={e=>setPassword(e.target.value)} />
                </div>
            </div>
            <div>
                <button className="memberButton" onClick={()=>props.taskFunc(email,password)}>{props.task}</button>
            </div>
        </div>
        </>
    )
}

export default Member;