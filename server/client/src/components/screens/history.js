import React,{useState,useContext, useEffect} from 'react'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {UserContext} from '../../App'
import Copy from 'copy-to-clipboard';
import Moment from 'react-moment';

const History = () => {
    const {state,dispatch}=useContext(UserContext);
    const [urls,setUrls]=useState([]);

    useEffect(()=>{
        fetch("/history",{
            headers:{"authorization":"Bearer "+localStorage.getItem("jwt")}
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            setUrls(data.urls)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    return (
        <>
           <div className="historyContainer">
                {
                    urls.slice(0).reverse().map((url)=>{
                        return (
                            <>
                            <div className="bothContainer">
                                <div className="date"><Moment format="DD/MM/YYYY HH:mm">
                                        {url.date}
                                </Moment></div>
                            <div className="longContainer">
                                <div className="one">URL</div>
                                <div className="two">{url.url.longUrl} </div>
                                <div className="three"><FileCopyIcon onClick={()=>{Copy(url.url.longUrl)}}/></div>
                            </div>
                            <div className="shortContainer">
                                <div className="one">Short URL</div>
                                <div  className="two">{url.url.shortUrl} </div>
                                <div className="three"><FileCopyIcon  onClick={()=>{Copy(url.url.longUrl)}}/></div>
                            </div>
                            </div>
                            </>
                        )
                    })
                }
                
            </div>
        </>
    )
}

export default History;
