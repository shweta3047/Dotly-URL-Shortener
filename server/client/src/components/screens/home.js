import React, { useState } from 'react'
import Copy from 'copy-to-clipboard';
import copy from 'copy-to-clipboard';

const Home = () => {
    const [longUrl,setLongUrl]=useState("");
    const [shortUrl,setShortUrl]=useState("");

    const createHandler=()=>{
        console.log("create")
        fetch("/shortUrl",{
            method:"POST",
            body:JSON.stringify({longUrl}),
            headers:{"Content-Type":"application/json","Authorization":"Bearer "+localStorage.getItem("jwt")}
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                alert(data.error)
            }
            else{
                setShortUrl(data.newUrl.shortUrl);
            }
        })
    }
    
    const cancelHandler=()=>{
        console.log("cancel")
        setLongUrl("");
        setShortUrl("");
    }

    const copyHandler=()=>{
        Copy(shortUrl);
    }
    return (
        <>
            <div className="urlContainer">
                <h1> Dotly-URL Shortener</h1>
                <input type="text" placeholder="Enter URL" name="longUrl" value={longUrl} onChange={e=>setLongUrl(e.target.value)} />
                <div className="buttons">
                    <button className="createButton" onClick={createHandler} >Create</button>
                    <button className="cancelButton" onClick={cancelHandler} >Cancel</button>
                </div>
                {
                    shortUrl!==""? <div className="shortUrl">
                    <span>{shortUrl} </span>
                    <button className="copyButton" onClick={copyHandler} >Copy</button>
                </div>:<div></div>
                }
            </div>
        </>
    )
}

export default Home