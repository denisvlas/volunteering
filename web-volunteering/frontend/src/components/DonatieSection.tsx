import React, { useContext, useEffect, useState } from "react";
import { SectionContext } from "../pages/evenimente/context";
import PopInfoMenu from "./PopInfoMenu";
import c from "../pages/evenimente/Eveniment.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Donatii, Necesitati } from "../pages/evenimente/models";
import { project } from "../styles/ProjecstList.module.css";
import { Context } from "../context";
import { functiiTypeBD } from "../pages/Registration/models";

function DonatieSection() {
  const { userInfo } = useContext(Context);
  const { id, p, setShowMenu, showMenu, section } = useContext(SectionContext);
  const [donatii, setDonatii] = useState<Donatii[]>([]);
  const [necesitati, setNecesitati] = useState<Necesitati[]>([]);
  const [loading, setLoading] = useState(true);

  async function getDonations() {
    try {
      const res = await axios.get(
        `http://localhost:5000//get-project-donations/${id}`
      );
      setDonatii(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function getNecesitati() {
    try {
      const res = await axios.get(
        `http://localhost:5000//get-necesitati/${id}`
      );
      setNecesitati(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getDonations();
    getNecesitati()
  }, []);

  useEffect(() => {
    donatii && setLoading(false);
    console.log(donatii);
  }, [donatii]);

  const [showForm, setShowForm] = useState(false);

  const [voluntari, setVoluntari] = useState<any[]>([]);

  async function getVoluntari() {
    try {
      const res = await axios.get(
        `http://localhost:5000///get-voluntari/${id}`
      );
      setVoluntari(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getVoluntari();
  }, []);

  const [input, setInput] = useState({
    id_voluntariat: "",
    donatie: "",
    cantitate: "",
    id_proiect:id,
  });

  function cancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault()
    setShowForm(false)
  }


  const handleInputChange = (field: string, value: string|number) => {
   if (field==="id_voluntariat"&&value!=="Anonim"){
    value = parseInt(value as string, 10); // Using type assertion
   }
    setInput((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  async function save(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault()
    console.log(input);
    
    try{
        const res=await axios.post("http://localhost:5000/insert-donatie",input)
        console.log(res.data);
        getDonations();
        setShowForm(false)
        setInput({ 
        id_voluntariat: "",
        donatie: "",
        cantitate: "",
        id_proiect:id
      })
    }catch(e){
      console.log(e);
      
    }
    
  }

  return (
    <>
      {!p ? (
        <div className={c.lodaing}>
          Loading...
          <div className={c["loading-spinner"]}></div>
        </div>
      ) : (
        <div className={c.section}>
          <header className={c.header}>
          <span>Ajutor Material</span>
            <i
              className="bi bi-list"
              onClick={() => setShowMenu(!showMenu)}
            ></i>
            {showMenu && <PopInfoMenu p={p} />}
          </header>
          <div className={c["table-container"]}>
            {loading ? (
              <div className={c.lodaing}>
                Loading...
                <div className={c["loading-spinner"]}></div>
              </div>
            ) : donatii.length !== 0 ? (
              <div className={c.container}>
                {userInfo.functie === functiiTypeBD.organizatori &&
                  userInfo.id === p.id_organizator &&
                  p.status !== "Finalizat" && (
                    <div className={`${c["add-necesitati-div"]} ${userInfo.functie===functiiTypeBD.organizatori&&c["org-show-necesitati"]}`}>
                      <div
                        onClick={() => setShowForm(!showForm)}
                        className={c["add-button"]}
                      >
                        <span>Inregistreaza o donatie</span>
                        <i className="bi bi-pen"></i>
                      </div>
                      {showForm&&
                        <div className={c["form-container"]}>
                          <form className={c["donatie-form"]}>
                            <div>
                              <label>Voluntar</label>
                              <select onChange={(e)=>handleInputChange("id_voluntariat",e.target.value)}>
                                <option value="" disabled selected hidden>
                                  Selectați voluntarul
                                </option>
                                <option value="Anonim">Anonim</option>
                                {voluntari.map((v,index) => (
                                  <option key={index} value={v.id_voluntariat}>{v.voluntar}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label>Donatie</label>
                              <select value={input.donatie} onChange={(e)=>handleInputChange("donatie",e.target.value)}>
                                <option value="" disabled selected hidden>
                                  Selectați donatia
                                </option>
                                {necesitati.map((n,index) => (
                                  <option key={index} value={n.necesitate}>{n.necesitate}</option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label>Cantitate</label>
                              <input value={input.cantitate} onChange={(e)=>handleInputChange("cantitate",e.target.value)} type="text"  placeholder="Introdu cantitatea donata"/>
                            </div>

                           <section className={c["save-cancel-btns"]}>
                            <button onClick={(e)=>save(e)}>Adauga</button>
                            <button onClick={(e)=>cancel(e)}>Cancel</button>
                           </section>
                            
                            
                          </form>
                          
                        </div>
                        
                      }
                    </div>
                  )}
                <div className={`${c["donatii-table"]} ${userInfo.functie===functiiTypeBD.organizatori&&c["org-show-necesitati-table"]}`}>
                  <table className={c["my-table"]}>
                    <tbody>
                      <tr>
                        <th>Voluntar</th>
                        <th>Donatie</th>
                        <th>Cantitate</th>
                        <th>Data</th>
                      </tr>
                      {donatii.map((n, index) => (
                        <React.Fragment key={n.id_donatie}>
                          <tr
                            className={
                              index % 2 === 0
                                ? "table-primary"
                                : "table-secondary"
                            }
                          >
                            <td>
                              {n.nume} {n.prenume}
                            </td>
                            <td>{n.donatii}</td>
                            <td>{n.cantitate}</td>
                            <td>{n.data}</td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              // necesitati.map(n=>(<>{n.necesitate}</>))
              <>
                {userInfo.functie === functiiTypeBD.organizatori &&
                  userInfo.id === p.id_organizator &&
                  p.status !== "Finalizat" && (
                    <div className={`${c["add-necesitati-div"]} ${userInfo.functie===functiiTypeBD.organizatori&&c["org-show-necesitati"]}`}>
                      <div
                        onClick={() => setShowForm(!showForm)}
                        className={c["add-button"]}
                      >
                        <span>Inregistreaza o donatie</span>
                        <i className="bi bi-pen"></i>
                      </div>
                      {showForm &&<div className={c["form-container"]}>
                          <form className={c["donatie-form"]}>
                            <div>
                              <label>Voluntar</label>
                              <select onChange={(e)=>handleInputChange("id_voluntariat",e.target.value)}>
                                <option value="" disabled selected hidden>
                                  Selectați voluntarul
                                </option>
                                <option value="Anonim">Anonim</option>
                                {voluntari.map((v,index) => (
                                  <option key={index} value={v.id_voluntariat}>{v.voluntar}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label>Donatie</label>
                              <select value={input.donatie} onChange={(e)=>handleInputChange("donatie",e.target.value)}>
                                <option value="" disabled selected hidden>
                                  Selectați donatia
                                </option>
                                {necesitati.map((n,index) => (
                                  <option key={index} value={n.necesitate}>{n.necesitate}</option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label>Cantitate</label>
                              <input value={input.cantitate} onChange={(e)=>handleInputChange("cantitate",e.target.value)} type="text"  placeholder="Introdu cantitatea donata"/>
                            </div>

                           <section className={c["save-cancel-btns"]}>
                            <button onClick={(e)=>save(e)}>Adauga</button>
                            <button onClick={(e)=>cancel(e)}>Cancel</button>
                           </section>
                            
                            
                          </form>
                          
                        </div>}
                    </div>
                  )}
                <h3 className={c["no-necesitati"]}>Nu-s donatii</h3>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default DonatieSection;
