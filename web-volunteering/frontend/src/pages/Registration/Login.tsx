import { useContext, useState } from "react";
import s from "../../styles/Register.module.css";
import { functiiType, functiiTypeBD, User } from "./models";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";

function Login() {
  const [functie, setFunctie] = useState<functiiType | "">(""); // Initialize with an empty string

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { userState, setUserState } = useContext(Context);

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

  const handleLogin = () => {
    login()
    // if (
    //   (userState.functie === functiiTypeBD.organizatori ||
    //     userState.functie === functiiTypeBD.voluntari) &&
    //   userState.nume.length > 3 &&
    //   userState.prenume.length > 3 &&
    //   isAlphabetic.test(userState.nume) &&
    //   isAlphabetic.test(userState.prenume) &&
    //   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userState.email) &&
    //   /^\d{12}$/.test(userState.telefon) &&
    //   userState.password.length >= 5
    // ) {
    //   login();
    // }else{setError("invalid")}
    // } else if (
    //   userState.functie === functiiTypeBD.sponsori &&
    //   userState.numeOrganizatie.length > 3 &&
    //   isAlphabetic.test(userState.numeOrganizatie) &&
    //   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userState.email)
    // ) {
    //   login();
      
    // } else {
    //   setError("Validarea a eșuat");
    // }
  };

  async function login() {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        userState
      );
      
      response.data&& setUserState({ ...userState,id:response.data[0].id, logged: true });
      // console.log(response.data);
      
      setUserState((prevUserState) => {
        if (prevUserState.logged) {
          navigate("/");
        }
        return prevUserState;
      });
    } catch (error) {
      console.log("Eroare la autentificare:", error);
    }
  }

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
        <span className={s["registration-title"]}>Login</span>
        <div className={s.functie}>
          <label htmlFor="functie">Rolul:</label>
          <select
            className={s.option}
            name="functie"
            onChange={(e) => handleReg(e.target.value as functiiType)}
          >
            <option value="">Alege opțiunea</option>
            <option value={functiiType.voluntar}>Voluntar</option>
            <option value={functiiType.organizator}>Organizator</option>
            <option value={functiiType.sponsor}>Sponsor</option>
          </select>
        </div>
        {functie && (
          <div className={s["voluntar-input"]}>
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
        
        {functie !== functiiType.sponsor && error && <span>{error}</span>}
        <span className={s["have-account"]} onClick={()=>navigate('/register')}>N-am cont</span>
        {functie && (
          <button onClick={() => handleLogin()} className={s.submit}>
            LOGIN
          </button>
        )}
      </section>
    </div>
  );
}

export default Login;
