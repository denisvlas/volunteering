import React, { useContext, useState, useEffect } from "react";
import c from "../pages/evenimente/Eveniment.module.css";
import PopInfoMenu from "./PopInfoMenu";
import { SectionContext } from "../pages/evenimente/context";
import { Context } from "../context";
import { functiiTypeBD } from "../pages/Registration/models";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import { parse, format } from "date-fns";
import { div } from "../styles/Profile.module.css";
import { redirect } from "react-router-dom";

function InfoSection() {
  const {
    setVolunteerProjects,
    volunteerProjects,
    handleSaveChanges,
    p,
    setShowMenu,
    showMenu,
    section,
    setEditedValues,
    editedValues,
    setEditToggle,
    editToggle,
    handleInputChange,
  } = useContext(SectionContext);
  const { setRendered, rendered, userInfo } = useContext(Context);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Apelează funcția pentru a obține lista de țări când componenta se încarcă
    getAllCountries();
  }, []);

  const getAllCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/get-all-countries"
      );
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const getCitiesByCountry = async (selectedCountry: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/get-cities-by-country",
        {
          country_name: selectedCountry,
        }
      );
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCountryChange = (selectedCountry: string) => {
    getCitiesByCountry(selectedCountry);
    handleInputChange("tara", selectedCountry); // Actualizează starea pentru țară
  };

  // const handleSaveChanges = () => {
  //   setEditToggle(false);
  //   console.log(editedValues);
  // };

  const handleDateChange = (field: string, date: Date | null) => {
    if (date) {
      setEditedValues((prevValues) => ({
        ...prevValues,
        [field]: date,
      }));
    }
  };

  const formatDate = (date: Date) => format(date, "dd-MM-yyyy");
  const currentDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(currentDate.getDate() + 1);

  async function handleParticip() {
    try {
      const res = await axios.post("http://localhost:5000/particip", {
        id_proiect: p?.id_proiect,
        id_voluntar: userInfo.id,
      });
      console.log(res.data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  async function getVoluntariat() {
    try {
      const res = await axios.post("http://localhost:5000/get-voluntariat", {
        id_voluntar: userInfo.id,
        functie: userInfo.functie,
        id_proiect: p?.id_proiect,
      });
      console.log(res.data);

      res.data.length > 0 && setVolunteerProjects(true);
      // console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getVoluntariat();
  }, [p]);

  setTimeout(() => {
    setRendered(true);
  }, 400);
  if (!rendered) {
    return null;
  }

  function cancel(){
    setEditToggle(false)
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
          <div className={c["informatii-section"]}>
            <header className={c.header}>
              <span>{section}</span>
              <i
                className="bi bi-list"
                onClick={() => setShowMenu(!showMenu)}
              ></i>
              {showMenu && <PopInfoMenu p={p} />}
            </header>

            <div className={c["informatii"]}>
              {!editToggle ? (
                <div className={c["info-table"]}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <span>Organizator:</span>
                        </td>
                        <td>
                          <span>{p.organizator}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Startul proiectului:</span>
                        </td>
                        <td>
                          <span>{formatDate(editedValues.inceput)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Sfarsitul proiectului:</span>
                        </td>
                        <td>
                          <span>{formatDate(editedValues.sfarsit)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Adresa locatiei:</span>
                        </td>
                        <td>
                          <span>
                            str.{editedValues.strada}, {editedValues.oras},{" "}
                            {editedValues.tara}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Categoria:</span>
                        </td>
                        <td>
                          <span>{editedValues.categorie}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                        {(parseInt(p.suma_necesara)>0)&&<span>Suma necesara:</span>}
                        </td>
                        <td>
                        {(parseInt(p.suma_necesara)>0)&&<span>{editedValues.suma_necesara} MDL</span>}
                        </td>
                      </tr>
                      <tr>
                        <td>
                        {(parseInt(p.suma_necesara)>0)&&<span>Suma stransa:</span>}
                        </td>
                        <td>
                        {(parseInt(p.suma_necesara)>0)&&<span>{editedValues.suma?editedValues.suma:"0 "}MDL</span>}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <>
                  <div className={c.col2}>
                    <div className={c.edit}>
                      <div className={c.flex}>
                        <label className={c["loc-labels"]} htmlFor="inceput">
                          Inceput
                        </label>
                        <ReactDatePicker
                          minDate={currentDate}
                          className={c.date}
                          selected={editedValues.inceput}
                          onChange={(date: Date) =>
                            handleDateChange("inceput", date)
                          }
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>

                      <div className={c.flex}>
                        <label className={c["loc-labels"]} htmlFor="sfarsit">
                          Sfarsit
                        </label>
                        <ReactDatePicker
                          minDate={nextDay}
                          className={c.date}
                          selected={editedValues.sfarsit}
                          onChange={(date: Date) =>
                            handleDateChange("sfarsit", date)
                          }
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>

                      <div className={c["edit-loc"]}>
                        <div>
                          <label className={c["loc-labels"]} htmlFor="tara">
                            Tara
                          </label>
                          <select
                            name="tara"
                            value={editedValues.tara}
                            onChange={(e) =>
                              handleCountryChange(e.target.value)
                            }
                          >
                            <option value="" disabled>
                              Selectează țara
                            </option>
                            {countries.map((country: any, index) => (
                              <option key={index} value={country.nume}>
                                {country.nume}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className={c["loc-labels"]} htmlFor="oras">
                            Oras
                          </label>
                          {cities && (
                            <select
                              name="oras"
                              value={editedValues.oras}
                              onChange={(e) =>
                                handleInputChange("oras", e.target.value)
                              }
                            >
                              <option value="" disabled>
                                Selectează orașul
                              </option>
                              {cities.map((city: any, index) => (
                                <option key={index} value={city.nume}>
                                  {city.nume}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                        <div>
                          <label className={c["loc-labels"]} htmlFor="strada">
                            Strada
                          </label>
                          <input
                            name="strada"
                            type="text"
                            value={editedValues.strada}
                            onChange={(e) =>
                              handleInputChange("strada", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className={c.flex}>
                        <label className={c["loc-labels"]} htmlFor="categorii">
                          Categorie
                        </label>
                        <select
                          name="categorii"
                          className={c.categorii}
                          value={editedValues.categorie}
                          onChange={(e) =>
                            handleInputChange("categorie", e.target.value)
                          }
                        >
                          <option value="Asistență medicală">
                            Asistență medicală
                          </option>
                          <option value="Social">Social</option>
                          <option value="Mediu">Mediu</option>
                          <option value="Educatie">Educație</option>
                        </select>
                      </div>
                      <div className={c.flex}>
                        <label className={c["loc-labels"]}>
                          Linkul imaginii
                        </label>
                        <input
                          onChange={(e) =>
                            handleInputChange("img", e.target.value)
                          }
                          value={editedValues.img}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={c["descriere-section"]}>
            <header className={c.header}>Descrierea evenimentului</header>
            <div className={c.descriere}>
              {editToggle ? (
                <textarea
                  className={c["descriere-section"]}
                  value={editedValues.descriere}
                  onChange={(e) =>
                    handleInputChange("descriere", e.target.value)
                  }
                />
              ) : (
                <>
                  <p>{editedValues.descriere}</p>
                  {!volunteerProjects &&
                    userInfo.functie === functiiTypeBD.voluntari && (
                      <button
                        className={c.participa}
                        onClick={() => handleParticip()}
                      >
                        Participa
                      </button>
                    )}
                </>
              )}
            </div>
          </div>
          {userInfo.functie === functiiTypeBD.organizatori &&
            userInfo.id === p.id_organizator &&
            p.status !== "Finalizat" && (
              <div className={c["save-btn-container"]}>
                {editToggle ? (
                  <div className={c["save-cancel-btns"]}>
                    <button
                      className={c["save-btn"]}
                      onClick={handleSaveChanges}
                    >
                      Salvează
                    </button>
                    <button
                      className={c["cancel-btn"]}
                      onClick={() => cancel()}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className={c["save-btn"]}
                    onClick={() => setEditToggle(true)}
                  >
                    Editează
                  </button>
                )}
              </div>
            )}
        </div>
      )}
    </>
  );
}

export default InfoSection;
