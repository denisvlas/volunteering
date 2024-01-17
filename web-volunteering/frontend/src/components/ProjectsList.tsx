import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import s from "../styles/ProjecstList.module.css";
import c from "../pages/evenimente/Eveniment.module.css";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Projects } from "../pages/evenimente/models";
import { useLocation, useNavigate } from "react-router-dom";
import { MainContext } from "../pages/main/context";
import { functiiTypeBD } from "../pages/Registration/models";

export default function ProjectList() {
  const navigate = useNavigate();
 const{projects,setProjects,userInfo,rendered,setRendered}=useContext(Context)

  function showDetails(idx: number) {
    navigate(`/eveniment/${idx}`);
  }
  
  

  const location = useLocation();

  // useEffect(()=>{
  //   userInfo.functie===functiiTypeBD.organizatori&&
  // getOrgprojects()
    
  // },[projects])

  // async function getOrgprojects() {
  //   try{

  //   }catch(e){
  //     console.log(e);
      
  //   }
  // }

  useEffect(()=>{
    if(userInfo.functie===functiiTypeBD.voluntari||userInfo.functie===functiiTypeBD.organizatori)
  getVoluntariat()

  setTimeout(() => {
    setRendered(true);
  }, 600);

  },[projects])
  const[volunteerProjects,setVolunteerProjects]=useState([])

  async function getVoluntariat() {
    try{
      const res=await axios.post("http://localhost:5000/get-voluntariat-id",{
          id_voluntar:userInfo.id,
          functie:userInfo.functie
      })
      setVolunteerProjects(res.data)
      // console.log(res.data);
      


    }catch(e){
      console.log(e);
      
    }
   }
  // Verifică dacă sunteți pe o rută specifică
  const isOnSpecificRoute = location.pathname === "/profile";
  if (!rendered) {
    return <div className={c.lodaing}>
    Loading...
    <div className={c["loading-spinner"]}>
    </div>
  </div>;
  }

  
  return (

    <div>
      <section className={s["projects-section"]}>
        
        {projects.length?projects
          .map((p: Projects,index:number) => (
            <div className={s.project} key={index}>
              {volunteerProjects.map((v:any)=>{
                if(v.id_proiect===p.id_proiect&&userInfo.functie===functiiTypeBD.voluntari)
                return<span className={s["volunteer-projects"]}  key={v.id_proiect}>Sunt Voluntar</span>
                if(v.id_proiect===p.id_proiect&&userInfo.functie===functiiTypeBD.organizatori)
                return<span className={s["organizators-projects"]}  key={v.id_proiect}>Organizat de noi</span>
              })}
              <div className={s["img-div"]}>
              
              {p.img?<img className={s.img} src={p.img} alt="" />:
                  <img className={s["no-img"]} src={'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt="sadas" />
                  }
              </div>
             
              <div className={s["p-info"]}>
              <div className={s["pr-header"]}>
              <span className={s.nume}>{p.nume}</span>
              {/* {userInfo.functie===functiiTypeBD.organizatori&&isOnSpecificRoute&&<i className={`bi bi-x ${s["close-x"]}`}></i>} */}
              </div>
                
                <div className={s["p-header"]}>
                  <span className={s.categorie}>{p.categorie}</span>
                  <span className={s.categorie}>{p.oras}</span>
                </div>
              
                <hr/>
                <span >Organizator: {p.organizator}</span>
                {(parseInt(p.suma_necesara)>0)&&<span >Suma necesară: {p.suma_necesara} MDL</span>}
                {(parseInt(p.suma_necesara)>0)&&<span >Suma strânsă: {p.suma?p.suma:0} MDL</span>}
                <span>Status: {p.status}</span>
                <hr />
                <div className={s["footer-project"]}>
                  <button
                    className={s["detalii-btn"]}
                    onClick={() => showDetails(p.id_proiect)}
                  >
                    DETALII
                  </button>
                </div>
              </div>
            </div>
          )):<></>}
          
      </section>
    </div>
  );
}


