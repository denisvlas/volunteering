import React, { useContext, useEffect, useState } from "react";
import { Projects } from "./models";
import { Context } from "../../context";
import ProjectList from "../../components/ProjectsList";
import { app } from "../../styles/App.module.css";
import { container } from "../../styles/Main.module.css";
import EventList from "../../components/EventList";
import axios from "axios";
import c from "./Eveniment.module.css";

import { SectionContext } from "./context";

function Evenimente() {
  const { projects, setProjects, userState, setUserInfo } = useContext(Context);

  async function getProjects() {
    try {
      const res = await axios.get("http://localhost:5000/get-all-projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProjects();
  }, [setProjects]);

  useEffect(() => {
    userState.logged &&
      localStorage.setItem("userInfo", JSON.stringify(userState));
  }, []);

  useEffect(() => {
    // Recuperare date din localStorage la încărcarea componentei
    const storedUserInfoString = localStorage.getItem("userInfo");

    if (storedUserInfoString !== null) {
      const storedUserInfo = JSON.parse(storedUserInfoString);
      setUserInfo(storedUserInfo);
    }
  }, []);
const choices=["Toate","Active","Vechi","Noi","Au strâns mult","Au strâns puțin","Pauză","Finalizate","În așteptare","Social","Mediu","Educație"]
const [filter,setFilter]=useState("Toate")


useEffect(()=>{
  
  filterProjects()
  

  
},[filter])

async function filterProjects() {
  try{
      const res=await axios.post("http://localhost:5000/get-filtered-projects",{filter:filter})
      console.log(res.data);
      setProjects(res.data);
      
  }catch(e){
    console.log(e);
    
  }
}


 function handleChangeFilter(value:string) {
  setFilter(value);
  
}
  return (
    <div className={container}>
      <section  className={c["filtru-section"]}>
        
        <select onChange={(e)=>handleChangeFilter(e.target.value)} className={c.filtru}>
        
          {choices.map((c,index)=>{
            return <option value={c} key={index}>{c}</option>
})}
        </select>
      </section>
      <EventList />
    </div>
  );
}

export default Evenimente;
