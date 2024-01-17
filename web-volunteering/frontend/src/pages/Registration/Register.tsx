import { useContext, useEffect, useState } from "react";
import s from "../../styles/Register.module.css";
import { User, functiiType, functiiTypeBD } from "./models";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";

function Register() {
  const [functie, setFunctie] = useState<functiiType | "">(""); // Initialize with an empty string

  // const [nume,setNume]=useState<string>('');
  // const [preNume,setPreNume]=useState<string>('');
  // const [email,setEmail]=useState<string>('');
  // const [telefon,setTelefon]=useState<string>('');

  
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const{userState,setUserState}=useContext(Context)
  const errorMessages = {
    invalidName: "Numele sau prenumele trebuie să conțină doar litere!",
    shortName: "Numele sau prenumele sunt prea scurte (minim 3 caractere)!",
    shortCompanyName: "Numele companiei trebuie sa aiba minim 3 caractere!",
    shortCont: "Cont invalid!",
    shortPhone: "Numărul de telefon este prea scurt (minim 12 caractere)!",
    invalidPhone: "Numărul de telefon nu este valid!",
    invalidEmail: "Formatul emailului este incorect!",
  };
  const isAlphabetic = /^[a-zA-Z]+$/;
  const handleRegistration = async () => {
    if ((userState.functie===functiiTypeBD.organizatori||userState.functie===functiiTypeBD.voluntari)&&userState.nume.length>=3&&
      userState.prenume.length>=3&&
      isAlphabetic.test(userState.nume)&&
      isAlphabetic.test(userState.prenume)&&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userState.email)&&
      /^\+\d{12}$/.test(userState.telefon)&&
      userState.password.length>=5
      ){
      registration()
      setUserState({...userState,logged:true})
    }else if(userState.functie===functiiTypeBD.sponsori&&userState.numeOrganizatie.length>3&&
    isAlphabetic.test(userState.numeOrganizatie)&&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userState.email)){
      registration()
      setUserState({...userState,logged:true})
    }else
    {setError("validation failed")
      
  }
   
  };

  async function registration() {
    try {
      const response = await axios.post("http://localhost:5000/register", userState);
      
      setUserState({ ...userState,id:response.data[0].id, logged: true })
      
    } catch (error) {
      console.error("Error registering user:",error );
    }
  }

  useEffect(() => {
      userState.id&&navigate('/')

  }, [userState.id])

  function handleReg(e: functiiType) {
    setFunctie(e);
    e === functiiType.organizator &&
      setUserState({ ...userState, functie: functiiTypeBD.organizatori });
    e === functiiType.voluntar &&
      setUserState({ ...userState, functie: functiiTypeBD.voluntari });
    e === functiiType.sponsor &&
      setUserState({ ...userState, functie: functiiTypeBD.sponsori });
    setError("");
  }
  return (
    <div className={s["register-page"]}>
      <section
        className={`${s["register-section"]} ${
          functie === functiiType.voluntar && s["voluntar-bg"]
        } ${functie === functiiType.organizator && s["organizator-bg"]} ${
          functie === functiiType.sponsor && s["sponsor-bg"]
        }`}
      >
        <span className={s["registration-title"]}>Registration</span>
        <div className={s.functie}>
          <label htmlFor="functie">Vreau sa fiu:</label>
          <select
            className={s.option}
            name="functie"
            onChange={(e) => handleReg(e.target.value as functiiType)}
          >
            <option value="">Alege optiunea</option>
            <option value={functiiType.voluntar}>Voluntar</option>
            <option value={functiiType.organizator}>Organizator</option>
            <option value={functiiType.sponsor}>Sponsor</option>
          </select>
        </div>
        <div></div>
        {functie === functiiType.voluntar && (
          <div className={s["voluntar-input"]}>
            <div>
              <label htmlFor="nume">Nume</label>
              <input
                name="nume"
                type="text"
                placeholder="Nume"
                onChange={(e) =>
                  setUserState({ ...userState, nume: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="prenume">Prenume</label>
              <input
                name="prenume"
                type="text"
                placeholder="Prenume"
                onChange={(e) =>
                  setUserState({ ...userState, prenume: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                onChange={(e) =>
                  setUserState({ ...userState, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="telefon">Telefon</label>
              <input
                name="telefon"
                type="text"
                placeholder="+373"
                onChange={(e) =>
                  setUserState({ ...userState, telefon: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password">Parola</label>
              <input
                name="password"
                type="password"
                placeholder="parola"
                onChange={(e) =>
                  setUserState({ ...userState, password: e.target.value })
                }
              />
            </div>
          </div>
        )}
        {functie === functiiType.organizator && (
          <div className={s["voluntar-input"]}>
            <div>
              <label htmlFor="nume">Nume</label>
              <input
                name="nume"
                type="text"
                placeholder="Nume"
                onChange={(e) =>
                  setUserState({ ...userState, nume: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="prenume">Prenume</label>
              <input
                name="prenume"
                type="text"
                placeholder="Prenume"
                onChange={(e) =>
                  setUserState({ ...userState, prenume: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                onChange={(e) =>
                  setUserState({ ...userState, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="telefon">Telefon</label>
              <input
                name="telefon"
                type="text"
                placeholder="+373"
                onChange={(e) =>
                  setUserState({ ...userState, telefon: e.target.value })
                }
              />
              
            </div>
            <div>
              <label htmlFor="password">Parola</label>
              <input
                name="password"
                type="password"
                placeholder="parola"
                onChange={(e) =>
                  setUserState({ ...userState, password: e.target.value })
                }
              />
            </div>
          </div>
        )}
        {functie === functiiType.sponsor && (
          <div className={s["sponsor-input"]}>
            <div>
              <label htmlFor="nume-organizatie">Numele companiei</label>
              <input
                name="nume-organizatie"
                type="text"
                placeholder="Numele organizatiei"
                onChange={(e) =>
                  setUserState({
                    ...userState,
                    numeOrganizatie: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                onChange={(e) =>
                  setUserState({ ...userState, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="cont">Cont</label>
              <input
                name="cont"
                type="text"
                placeholder="MDXXXXXXXXXXXXX"
                onChange={(e) =>
                  setUserState({ ...userState, cont: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password">Parola</label>
              <input
                name="password"
                type="password"
                placeholder="parola"
                onChange={(e) =>
                  setUserState({ ...userState, password: e.target.value })
                }
              />
            </div>
            {error && <span>{error}</span>}
          </div>
        )}
        {functie !== functiiType.sponsor &&error&& <span>{error}</span>}
        <span className={s["have-account"]} onClick={()=>navigate('/login')}>Am cont</span>
        {functie && (
          <button onClick={() => handleRegistration()} className={s.submit}>
            NEXT
          </button>
        )}
      </section>
    </div>
  );
}

export default Register;
