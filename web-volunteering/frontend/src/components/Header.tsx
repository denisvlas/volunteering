import React, { useContext, useEffect } from "react";
import s from "../styles/Main.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context";

import { Projects } from "../pages/evenimente/models";
import { functiiTypeBD } from "../pages/Registration/models";

function Header() {
  const{userInfo,setUserInfo,setUserState,userState}=useContext(Context)
  const navigate=useNavigate()
  function logOut(){
    localStorage.setItem('userInfo', JSON.stringify({...userState,logged:false}));
    localStorage.clear();

    navigate('/')
    window.location.reload();
  } 
 
  return (
    <header className={s.header}>
      <div className={s.links}>
        <Link to={"/evenimente"}>Evenimente</Link>
        <Link to={"/"}>Acasa</Link>
      </div>
      {userInfo.logged&&
        <div className={s.profile}>
        <i onClick={()=>logOut()} className="bi bi-box-arrow-left"></i>
        {userInfo.functie===functiiTypeBD.voluntari&&<div onClick={()=>navigate('/profile')}className={s["v-profile"]}>V</div>}
        {userInfo.functie===functiiTypeBD.organizatori&&<div  onClick={()=>navigate('/profile')}className={s["o-profile"]}>O</div>}
        {userInfo.functie===functiiTypeBD.sponsori&&<div  onClick={()=>navigate('/profile')}className={s["s-profile"]}>S</div>}
        </div>
        }
    </header>
  );
}

export default Header;
