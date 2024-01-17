import React, { useContext, useEffect, useState } from "react";
import s from "../styles/ProjecstList.module.css";
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function ProjectList() {
  const [info, setInfo] = useState<any[]>([]);

  async function getAllProjectInfo() {
    try {
      const res = await axios.get("http://127.0.0.1:5000/get-all-info");
     
      const{suma_totala_proiecte,numar_proiecte,numar_voluntari}=res.data[0]
      setInfo([
        {
          title:'Suma',
          text:`Proiectele au strâns în total:`,
          var:`${suma_totala_proiecte} MDL`,
          icon:"bi bi-cash-stack",

        },{
          title:'Proiecte',
          text:'Proiecte organizate:',
          var:numar_proiecte,
          icon:"bi bi-check-lg"
        },{
          title:'Voluntari',
          text:'Voluntari înregistrați:',
          var:numar_voluntari,
          icon:"bi bi-people-fill"
        }
        ])
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllProjectInfo();
  }, []);
  return (
    <div>

      <section className={s["info-section"]}>
        {info.map((i: any,index:number) => (
          <div className={s["all-info"]} key={index} >
            <h4 className={s.title}>{i.title}</h4>
            <div className={s['info-projects']}>
              <span className={s.text}>{i.text}</span>
              <span className={s.var}>{i.var}</span> 
              <i className={i.icon}></i>
            </div>
          </div>
      ))}
      </section>


    </div>
  );
}
