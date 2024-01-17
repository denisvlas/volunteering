import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SectionContext } from "./context";
import {  Projects, Transactions, menu, menuType } from "./models";
import axios from "axios";
import c from "./Eveniment.module.css";
import s from '../../styles/ProjecstList.module.css'
import x from "../../styles/Main.module.css";
import PopInfoMenu from "../../components/PopInfoMenu";
import InfoSection from "../../components/InfoSection";
import Necesitati from "../../components/NecesitatiSection";
import NecesitatiSection from "../../components/NecesitatiSection";
import StatisticaSection from "../../components/StatisticaSection";
import HistoryTransactions from "../../components/HistoryTransactions";
import { Context } from "../../context";
import { parse, format } from 'date-fns';
import { functiiTypeBD, statuses } from "../Registration/models";
import DonatieSection from "../../components/DonatieSection";

function Eveniment() {
  const { id } = useParams();
  const [p, setProject] = useState<Projects|undefined>();
  const { setRendered,rendered,userInfo } = useContext(Context);
  const[loading,setLoading]=useState(true)
  async function getProjects() {
    try {
      const res = await axios.get(
        `http://localhost:5000/get-project-info/${id}`
      );
      setProject(res.data[0]);
    

    } catch (err) {
      console.log(err);
    }
  }
  


  useEffect(() => {
    getProjects();
  }, []);

  const{userState,setUserInfo}=useContext(Context)
  useEffect(() => {
    userState.logged&&
    localStorage.setItem('userInfo', JSON.stringify(userState));
  }, []);

  useEffect(() => {
    // Recuperare date din localStorage la încărcarea componentei
    const storedUserInfoString = localStorage.getItem('userInfo');

    if (storedUserInfoString !== null) {
      const storedUserInfo = JSON.parse(storedUserInfoString);
      setUserInfo(storedUserInfo);
    }
  }, []);
  
  const [showMenu,setShowMenu]=useState(false)
  const [section,setSection]=useState<menuType>(menu.InformatiiGenerale)
  const[showTr,setShowTr]=useState(false);
  const [editToggle, setEditToggle] = useState(false);
useEffect(()=>{
  setEditToggle(false)
},[section])
  const handleInputChange = (field: string, value: string) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const [editedValues, setEditedValues] = useState({
    img:p?.img||"",
    inceput: p ? parse(p.inceput, 'dd-MM-yyyy', new Date()) : new Date(),
    sfarsit: p ? parse(p.sfarsit, 'dd-MM-yyyy', new Date()) : new Date(),
    strada: p?.strada || '',
    oras: p?.oras || '',
    tara: p?.tara || '',
    categorie: p?.categorie || 'Asistență medicală',
    descriere: p?.descriere || '',
    nume: p?.nume || '',
    status: p?.status || '',
    suma: p?.suma || '',
    suma_necesara: p?.suma_necesara || '',
  });
useEffect(()=>{
setEditedValues({
  img:p?.img||"",
  inceput: p ? parse(p.inceput, 'dd-MM-yyyy', new Date()) : new Date(),
  sfarsit: p ? parse(p.sfarsit, 'dd-MM-yyyy', new Date()) : new Date(),
  strada: p?.strada || '',
  oras: p?.oras || '',
  tara: p?.tara || '',
  categorie: p?.categorie || 'Asistență medicală',
  descriere: p?.descriere || '',
  nume: p?.nume || '',
  status: p?.status || '',
  suma: p?.suma || '',
  suma_necesara: p?.suma_necesara || '',

})

},[p])

const[volunteerProjects,setVolunteerProjects]=useState(false)
const [error,setError]=useState<null|string>(null)
const [success,setSuccess]=useState<null|string>(null)
async function updateProject(values:any) {
  try{
      const res=await axios.post(`http://localhost:5000/updateProject/${id}`,values)
      console.log(res.data);
      
      if(res.data.message){
        setEditToggle(false);
        setError(null)
        setSuccess('Proiectul a fost modificat');
        getProjects()
        setTimeout(() => {
          setSuccess(null)
        }, 1500);

      }else{
        setError('Acest nume este ocupat')
        setEditToggle(true)

       
      }
      
      
      
  }catch(e){
    console.log(e);
    
  }
}

const handleSaveChanges = () => {
  

  const formattedValues = {
    ...editedValues,
    inceput: format(editedValues.inceput, 'yyyy-MM-dd'),
    sfarsit: format(editedValues.sfarsit, 'yyyy-MM-dd'),
  };
  
  updateProject(formattedValues);
}


  return (
    <SectionContext.Provider value={{volunteerProjects,setVolunteerProjects,handleSaveChanges,handleInputChange,setEditToggle,editToggle,editedValues,setEditedValues,showTr,setShowTr,id,section, setSection,setShowMenu,showMenu,setProject,p }}>
    <div className={x.container}>
      {!p? (
        <div className={c.lodaing}>
          Loading...
          <div className={c["loading-spinner"]}>
          </div>
        </div>
      ) : (
        <div className={c.eveniment}>
          <div className={c.div}>
              <div className={s["img-div"]}>
                {userInfo.functie===functiiTypeBD.voluntari&&volunteerProjects&&<span className={s["volunteer-projects"]}  >Sunt Voluntar</span>}
                {userInfo.functie===functiiTypeBD.organizatori&&volunteerProjects&&<span className={s["organizators-projects"]}  >Organizat de noi</span>}
                  <img className={s["img-ev"]} src={p.img} alt="" />
              </div>
              {
                editToggle? 
                <div className={c["p-info"]}>
                  {error&&<span className={c.error}>{error}</span>}

                <input  onChange={(e) => handleInputChange('nume', e.target.value)} value={editedValues.nume} className={`${s.nume} ${s.nume && error ? c["error-input"] : ''}`}/>
                  <div className={s["p-header"]}>
                    <span className={s.categorie}>{p.categorie}</span>
                    <span className={s.categorie}>{p.oras}</span>
                  </div>
                
                  <hr/>
                  {(parseInt(p.suma_necesara)>0)&&<span >Suma strânsă: {p.suma?p.suma:0} MDL</span>}

                  <div >
                  <label htmlFor="status">Status: </label>
                  <select
                        name="status"
                        className={c.categorii}
                        value={editedValues.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                      >
                        <option value="Activ">Activ </option>
                        <option value="Finalizat">Finalizat</option>
                        <option value="Pauza">Pauza</option>
      </select>
    </div>
                  <hr />
              </div>:
              <div className={c["p-info"]}>
                  {success&&<span className={c.success}>{success}</span>}
                <span className={s.nume}>{editedValues.nume}</span>
                <div className={s["p-header"]}>
                  <span className={s.categorie}>{p.categorie}</span>
                  <span className={s.categorie}>{p.oras}</span>
                </div>
              
                <hr/>
                {(parseInt(p.suma_necesara)>0)&&<span >Suma strânsă: {p.suma?p.suma:0} MDL</span>}

                <span>Status: {editedValues.status}</span>
                <hr />
              </div>
              }
             

              
          </div>
          {section===menu.InformatiiGenerale&&<InfoSection/>}
          {section===menu.Necesitati&&<NecesitatiSection />}
          {section===menu.Finantari&&<StatisticaSection />}
          {section===menu.Donatie&&<DonatieSection/>}
              
        </div>
      )}
    </div>
    </SectionContext.Provider>
  );
}

export default Eveniment;