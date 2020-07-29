import React,{useState,useEffect,useContext,createContext,useReducer} from 'react';
import {BrowserRouter,Route,useHistory,Switch} from 'react-router-dom';
import Navbar from './components/navbar';
import SignUp from './components/screens/signup';
import Login from './components/screens/login';
import History from './components/screens/history';
import Home from './components/screens/home';
import {initialState,reducer} from './reducers/userAuth';

import './stylesheets/member.css'
import './stylesheets/home.css'
import './stylesheets/history.css'

export const UserContext=createContext();

const Routing=()=>{
  const history=useHistory();
  const {state,dispatch}=useContext(UserContext);
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      if(!history.location.pathname.startsWith("/signup"))
      history.push("/login")
    }
  },[])
  return(
    <>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route path="/signup"><SignUp /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/history"><History/></Route>
      </Switch>
    </>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <>
    <BrowserRouter>
      <Navbar />
      <Routing />
    </BrowserRouter>
    </>
    </UserContext.Provider>
  );
}

export default App;
