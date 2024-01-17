import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import axios from "axios";
import { ProfileInfo, functiiTypeBD } from "../Registration/models";
import { Projects } from "../evenimente/models";
import s from "../../styles/Profile.module.css";
import ProjectList from "../../components/ProjectsList";
import ReactDatePicker from "react-datepicker";
import { parse, format } from "date-fns";
import c from "../evenimente/Eveniment.module.css";

interface EditedValues {
  inceput: Date;
  sfarsit: Date;
  strada: string;
  oras: string;
  tara: string;
  categorie: string;
  descriere: string;
  nume: string;
  img: string;
  suma_necesara:number;
}

function Profile() {
  const {
    loading,
    setLoading,
    projects,
    setProjects,
    userState,
    userInfo,
    setUserInfo,
    rendered,
    setRendered
  } = useContext(Context);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo[]>([
    {
      id: 0,
      nume: "",
      prenume: "",
      telefon: "",
      likeuri: 0,
      email: "",
      numar_proiecte: 0,
      suma_donata: 0,
    },
  ]);

  async function getProjects() {
    try {
      const res = await axios.post("http://localhost:5000/get-org-projects", {
        id: profileInfo[0].id,
        functie: userInfo.functie,
      });

      setProjects(res.data);
      res.data && setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    fetchdata();
  }, [userInfo]);

  useEffect(() => {

    getProjects();
    console.log(profileInfo);
    
  }, [profileInfo[0]]);

  const fetchdata = async () => {
    try {
      const res = await axios.post("http://localhost:5000/user-info", userInfo);
      setProfileInfo(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const [click, setClick] = useState(false);
  const formatDate = (date: Date) => format(date, "dd-MM-yyyy");
  const currentDate = new Date();
  const nextDay = new Date();

  const [editedValues, setEditedValues] = useState<EditedValues>({
    inceput: currentDate,
    sfarsit: nextDay,
    strada: "",
    oras: "",
    tara: "",
    categorie: "",
    descriere: "",
    nume: "",
    img: "",
    suma_necesara:0,
  });
  useEffect(() => {
    nextDay.setDate(editedValues.inceput.getDate() + 1);
  }, [editedValues.inceput]);

  const handleDateChange = (field: string, date: Date | null) => {
    if (field === "inceput" && date) {
      // If the start date is changed, update both start and end dates
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);

      setStartDate(date);
      setEditedValues((prevValues) => ({
        ...prevValues,
        inceput: date,
        sfarsit: nextDay,
      }));
    } else if (field === "sfarsit" && date) {
      // If the end date is changed, update only the end date
      setEditedValues((prevValues) => ({
        ...prevValues,
        [field]: date,
      }));
    }
  };
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const handleCountryChange = (selectedCountry: string) => {
    getCitiesByCountry(selectedCountry);
    handleInputChange("tara", selectedCountry); // Actualizează starea pentru țară
  };
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

  const handleInputChange = (field: string, value: string) => {
   
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  useEffect(() => {
    // Apelează funcția pentru a obține lista de țări când componenta se încarcă
    getAllCountries();
  }, []);
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

  const [error, setError] = useState<null | string>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  function handleSaveChanges() {
    
    for (const key of Object.keys(editedValues) as (keyof EditedValues)[]) {
      if (!editedValues[key] && key !== 'suma_necesara' ) {
        setError('Completează toate campurile!')
        setTimeout(() => {
        setError(null)
        }, 2000);
        return;
      }
      console.log(editedValues);
      
      setError(null)
    }

    const formattedValues = {
      ...editedValues,
      id_org: userInfo.id,
      inceput: format(editedValues.inceput, "yyyy-MM-dd"),
      sfarsit: format(editedValues.sfarsit, "yyyy-MM-dd"),
    };
    insertProject(formattedValues);
    
  }

  async function insertProject(data: any) {
    try {
      const res = await axios.post("http://localhost:5000/insertProject", data);
      console.log("---",data);
      
      console.log(res.data);
      res.data&&getProjects()
      res.data&&setClick(false)
    } catch (e) {
      console.log(e);
    }
  }

  function handleCancel(){
    setClick(false)
    setEditedValues({
      inceput: currentDate,
      sfarsit: nextDay,
      strada: "",
      oras: "",
      tara: "",
      categorie: "",
      descriere: "",
      nume: "",
      img: "",
      suma_necesara:0,
    })
    setError(null)
    
  }

  useEffect(()=>{
    console.log(rendered);
    
  },[rendered])
  
  return (
    <div className={s.container}>
      {loading ? (
        <div className={s.lodaing}>
          Loading...
          <div className={s["loading-spinner"]}></div>
        </div>
      ) : (
        <div className={s.wrapper}>
          <div className={s["user-info-section"]}>
            {userInfo.email && profileInfo[0] && (
              <div className={s.div}>
                <span className={s.nume}>Informatii {userInfo.functie}</span>
                <span className={s.categorie}>
                  {userInfo.functie === functiiTypeBD.sponsori
                    ? "Organizație"
                    : "Nume"}
                  : {profileInfo[0].nume}
                </span>
                {userInfo.functie !== functiiTypeBD.sponsori && (
                  <span className={s.categorie}>
                    prenume: {profileInfo[0].prenume}
                  </span>
                )}
                {userInfo.functie !== functiiTypeBD.sponsori && (
                  <span className={s.categorie}>
                    telefon: {profileInfo[0].telefon}
                  </span>
                )}
                <span className={s.categorie}>
                  likeuri: {profileInfo[0].likeuri}
                </span>
                <span className={s.categorie}>
                  email: {profileInfo[0].email}
                </span>
                <span className={s.categorie}>
                  Proiecte{" "}
                  {userInfo.functie === functiiTypeBD.organizatori &&
                    "organizate"}
                  {userInfo.functie === functiiTypeBD.voluntari && "implicate"}
                  {userInfo.functie === functiiTypeBD.sponsori &&
                    "sponsorizate"}
                  : {profileInfo[0].numar_proiecte}
                </span>
                {userInfo.functie === functiiTypeBD.sponsori && (
                  <span className={s.categorie}>
                    Suma totala donată: {profileInfo[0].suma_donata}MDL
                  </span>
                )}
              </div>
            )}
          </div>
          <div className={s["projects-section"]}>
            <div className={s["header-profile"]}>
              {userInfo.functie === functiiTypeBD.organizatori && (
                <h2 className={s.nume}>Proiecte organizate:</h2>
              )}
              {userInfo.functie === functiiTypeBD.sponsori && (
                <h2 className={s.nume}>Proiecte sponsorizate:</h2>
              )}
              {userInfo.functie === functiiTypeBD.voluntari && (
                <h2 className={s.nume}>Activ în proiectele:</h2>
              )}
              {userInfo.functie === functiiTypeBD.organizatori && (
                <i
                  onClick={() => setClick(true)}
                  className="bi bi-plus-circle"
                ></i>
              )}
            </div>
            {click && (
              <div className={s["add-project-form"]}>
                <div className={c.flex}>
                  <label className={c["loc-labels"]}>Numele proiectului</label>
                  <input
                    onChange={(e) => handleInputChange("nume", e.target.value)}
                    value={editedValues.nume}
                  />
                </div>
                <div className={c.flex}>
                  <label className={c["loc-labels"]} htmlFor="inceput">
                    Inceput
                  </label>
                  <ReactDatePicker
                    minDate={currentDate}
                    className={c.date}
                    selected={editedValues.inceput}
                    onChange={(date: Date) => handleDateChange("inceput", date)}
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
                    onChange={(date: Date) => handleDateChange("sfarsit", date)}
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
                      onChange={(e) => handleCountryChange(e.target.value)}
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
                    <option value="" disabled selected hidden>
                      Selectați o categorie
                    </option>
                    <option value="Asistență medicală">
                      Asistență medicală
                    </option>
                    <option value="Social">Social</option>
                    <option value="Mediu">Mediu</option>
                    <option value="Educatie">Educație</option>
                  </select>
                </div>
                <div className={s["descriere-section"]}>
                  <label>Descriere</label>
                  <textarea
                    value={editedValues.descriere}
                    onChange={(e) =>
                      handleInputChange("descriere", e.target.value)
                    }
                  />
                </div>
                <div className={c.flex}>
                  <label className={c["loc-labels"]}>Suma necesara</label>
                  <input
                    min={0}
                    onKeyDown={(e) => {
                      if (e.key === '-' || e.key === 'e') {
                        e.preventDefault();
                      }
                    }}
                    type="number"
                    onChange={(e) => handleInputChange("suma_necesara", e.target.value)}
                    value={editedValues.suma_necesara}
                    
                  />
                </div>
                <div className={c.flex}>
                  <label className={c["loc-labels"]}>Linkul imaginii</label>
                  <input
                    onChange={(e) => handleInputChange("img", e.target.value)}
                    value={editedValues.img}
                    
                  />
                </div>
                <div className={c["save-cancel-btns"]}>
                  <button className={c["save-btn"]} onClick={handleSaveChanges}>
                    Salvează
                  </button>
                  <button
                    className={c["cancel-btn"]}
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </button>
                  {error && <div>{error}</div>}
                </div>
              </div>
            )}

            {projects.length && !click ? (
                  <ProjectList />
            ) : (
              <div className={s["no-projects"]}>
                <i className="bi bi-emoji-frown"></i>Nu-s proiecte
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
