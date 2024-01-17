import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Info from "../../components/Info";
import ProjectsList from "../../components/ProjectsList";
import s from "../../styles/Main.module.css";
import { Projects } from "../evenimente/models";
import { Context } from "../../context";
import { app } from "../../styles/App.module.css";
import axios from "axios";
import { User } from "../Registration/models";
import { MainContext } from "./context";

function Main() {
  const { userState, userInfo, setUserInfo, projects, setProjects } = useContext(Context);

async function getProjects() {
  try {
    const res = await axios.get("http://127.0.0.1:5000/get-3-projects");
    setProjects(res.data);
  } catch (err) {
    console.log(err);
  }
}

useEffect(() => {
  const storedUserInfoString = localStorage.getItem('userInfo');

  if (storedUserInfoString !== null) {
    const storedUserInfo = JSON.parse(storedUserInfoString);
    setUserInfo((prevUserInfo) => {
     
      return { ...prevUserInfo, ...storedUserInfo };
    });
  }
}, []); 
useEffect(() => {
  getProjects();
}, []);



  return (
    <div className={app}>
      <div className={s.container}>
        <div className={s.section}>
          <h1>Evenimente de caritate si voluntariat</h1>
          <h2>Ușurăm crearea și organizarea proiectelor de caritate</h2>
          {!userInfo.logged&&<div className={s["reg-btns"]}>
            <a href="/register" className={s["reg-org"]}>
              Înregistrează-te
            </a>
            <a href="/login" className={s["reg-voluntar"]}>
              Intră în cont
            </a>
          </div>}
        </div>

        <Info />
        <ProjectsList />
      </div>
    </div>
  );
}

export default Main;
