import React, { useContext, useEffect, useState } from "react";
import { SectionContext } from "../pages/evenimente/context";
import PopInfoMenu from "./PopInfoMenu";
import c from "../pages/evenimente/Eveniment.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Necesitati } from "../pages/evenimente/models";
import { project } from "../styles/ProjecstList.module.css";
import { Context } from "../context";
import { functiiTypeBD } from "../pages/Registration/models";

function NecesitatiSection() {
  const { userInfo } = useContext(Context);
  const { id, p, setShowMenu, showMenu, section } = useContext(SectionContext);
  const [necesitati, setNecesitati] = useState<Necesitati[]>([]);
  const [loading, setLoading] = useState(true);

  async function getNecesitati() {
    try {
      const res = await axios.get(`http://localhost:5000/get-necesitati/${id}`);
      setNecesitati(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getNecesitati();
  }, []);

  useEffect(() => {
    necesitati && setLoading(false);
    console.log(necesitati);
  }, [necesitati]);

  const [editToggle, setEditToggle] = useState<null | number>(null);

  function toggleNecesitati(i: number) {
    editToggle !== null ? setEditToggle(null) : setEditToggle(i);
  }

  const [editedValues, setEditedValues] = useState(necesitati);

  useEffect(() => {
    setEditedValues(necesitati);
  }, [necesitati]);
  const handleInputChange = (index: number, field: string, value: string) => {
    // Creează o nouă copie a listei
    const updatedValues = [...editedValues];
    // Actualizează câmpul specific pentru elementul la index-ul dat
    updatedValues[index] = { ...updatedValues[index], [field]: value };
    // Actualizează starea cu lista actualizată
    setEditedValues(updatedValues);
  };
  async function saveValues(id: number) {
    // console.log("id",id);
    const necesitate = editedValues.filter((e) => e.id_necesitate === id);
    // console.log(necesitate[0])
    try {
      const res = await axios.put(
        `http://localhost:5000/update-necesitate/${id}`,
        necesitate[0]
      );
      getNecesitati();
      setEditedValues(necesitati);
      setEditToggle(null);
      // console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteNecesitate(id: number) {
    try {
      const res = await axios.delete(
        `http://localhost:5000/delete-necesitate/${id}`
      );
      console.log(res.data);
      getNecesitati();
    } catch (e) {
      console.log(e);
    }
  }
  const [showForm, setShowForm] = useState(false);
  const [necesitate, setNecesitate] = useState({
    necesitate: "",
    cantitate: "",
  });

  function addNecesitate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setEditToggle(null);
    saveNecesitate(necesitate);
  }

  async function saveNecesitate(necesitate: any) {
    try {
      const res = await axios.post(
        `http://localhost:5000/add-necesitate/${id}`,
        necesitate
      );
      getNecesitati();
      setShowForm(false);
      console.log(res.data);
      console.log(necesitate);
    } catch (e) {
      console.log(e);
    }
  }

  function cancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setShowForm(false);
    setNecesitate({ necesitate: "", cantitate: "" });
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
            <span>{section}</span>
            <span className={c["cantitate-span"]}>Cantitate</span>
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
            ) : necesitati.length !== 0 ? (
              <div className={c.container}>
                {userInfo.functie === functiiTypeBD.organizatori &&
                  userInfo.id === p.id_organizator &&
                  p.status !== "Finalizat" && (
                    <div
                      className={`${c["add-necesitati-div"]} ${
                        userInfo.functie === functiiTypeBD.organizatori &&
                        c["org-show-necesitati"]
                      }`}
                    >
                      <div
                        onClick={() => setShowForm(!showForm)}
                        className={c["add-button"]}
                      >
                        <span className={c["adauga-button"]}>
                          Adauga o necesitate
                        </span>
                        <i className="bi bi-plus-lg"></i>
                      </div>
                      {showForm && (
                         <div className={c["form-container"]}>
                        <form className={c["donatie-form"]}>
                          <input
                            type="text"
                            placeholder="Introdu necesitatea"
                            onChange={(e) =>
                              setNecesitate({
                                ...necesitate,
                                necesitate: e.target.value,
                              })
                            }
                          />
                          <input
                            type="text"
                            placeholder="Introdu cantitatea"
                            onChange={(e) =>
                              setNecesitate({
                                ...necesitate,
                                cantitate: e.target.value,
                              })
                            }
                          />
                          <div className={c["adauga-cancel-btn"]}>
                            <button onClick={(e) => addNecesitate(e)}>
                              Adauga
                            </button>
                            <button onClick={(e) => cancel(e)}>Cancel</button>
                          </div>
                        </form>
                        </div>
                      )}
                    </div>
                  )}
                <div
                  className={`${c["donatii-table"]} ${
                    userInfo.functie === functiiTypeBD.organizatori &&
                    c["org-show-necesitati-table"]
                  }`}
                >
                  <table className={c["my-table"]}>
                    <tbody>
                      {necesitati.map((n, index) => (
                        <React.Fragment key={n.id_necesitate}>
                          {editToggle !== index ? (
                            <tr
                              className={
                                index % 2 === 0
                                  ? "table-primary"
                                  : "table-secondary"
                              }
                            >
                              <td>{n.necesitate}</td>
                              <td>{n.cantitate}</td>
                              {userInfo.functie ===
                                functiiTypeBD.organizatori &&
                                userInfo.id === p.id_organizator &&
                                p.status !== "Finalizat" && (
                                  <td className={c["edit-btns-td"]}>
                                    <div className={c["edit-btns"]}>
                                      <i
                                        onClick={() => toggleNecesitati(index)}
                                        className={`${c["edit-necesitate-btn"]} bi bi-pencil-square`}
                                      ></i>
                                      <i
                                        onClick={() =>
                                          deleteNecesitate(n.id_necesitate)
                                        }
                                        className={`${c["edit-necesitate-btn"]} bi bi-trash3`}
                                      ></i>
                                    </div>
                                  </td>
                                )}
                            </tr>
                          ) : (
                            <tr
                              className={
                                index % 2 === 0
                                  ? "table-primary"
                                  : "table-secondary"
                              }
                            >
                              <td>
                                <input
                                  className={c["edit-necesitate-input"]}
                                  value={editedValues[index].necesitate}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "necesitate",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "cantitate",
                                      e.target.value
                                    )
                                  }
                                  className={c["edit-necesitate-input"]}
                                  value={editedValues[index].cantitate}
                                />
                              </td>
                              {userInfo.functie ===
                                functiiTypeBD.organizatori &&
                                userInfo.id === p.id_organizator && (
                                  <td className={c["edit-btns-td"]}>
                                    <div className={c["edit-btns"]}>
                                      <i
                                        onClick={() =>
                                          saveValues(n.id_necesitate)
                                        }
                                        className={`${c["edit-necesitate-btn"]} bi bi-check2`}
                                      ></i>
                                      <i
                                        onClick={() => toggleNecesitati(index)}
                                        className={`${c["edit-necesitate-btn"]} bi bi-x-lg`}
                                      ></i>
                                    </div>
                                  </td>
                                )}
                            </tr>
                          )}
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
                    <div
                      className={`${c["add-necesitati-div"]} ${
                        userInfo.functie === functiiTypeBD.organizatori &&
                        c["org-show-necesitati"]
                      }`}
                    >
                      <div
                        onClick={() => setShowForm(!showForm)}
                        className={c["add-button"]}
                      >
                        <span>Adauga o necesitate</span>
                        <i className="bi bi-plus-lg"></i>
                      </div>
                      {showForm && (
                        <div className={c["form-container"]}>
                        <form className={c["donatie-form"]}>
                          <div>
                            <label>Necesitatea</label>
                          <input
                            type="text"
                            placeholder="Introdu necesitatea"
                            onChange={(e) =>
                              setNecesitate({
                                ...necesitate,
                                necesitate: e.target.value,
                              })
                            }
                          />
                          </div>
                          <div>
                            <label>Cantitatea</label>
                          <input
                            type="text"
                            placeholder="Introdu cantitatea"
                            onChange={(e) =>
                              setNecesitate({
                                ...necesitate,
                                cantitate: e.target.value,
                              })
                            }
                          />
                          </div>
                          
                          <div className={c["adauga-cancel-btn"]}>
                            <button onClick={(e) => addNecesitate(e)}>
                              Adauga
                            </button>
                            <button onClick={(e) => cancel(e)}>Cancel</button>
                          </div>
                        </form>
                        </div>
                      )}
                    </div>
                  )}
                <h3 className={c["no-necesitati"]}>Nu-s necesitati</h3>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default NecesitatiSection;
