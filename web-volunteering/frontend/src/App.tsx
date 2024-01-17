import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Register from "./pages/Registration/Register";
import s from "./styles/App.module.css";
import { Context } from "./context";
import { useState } from "react";
import Main from "../src/pages/main/Main";
import Evenimente from "./pages/evenimente/Evenimente";
import { Projects } from "./pages/evenimente/models";
import Eveniment from "./pages/evenimente/Eveniment";
import NotFound from "./pages/NotFound";
import { User } from "./pages/Registration/models";
import Login from "./pages/Registration/Login";
import Profile from "./pages/profile/Profile";

function App() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [userState, setUserState] = useState<User>({
    functie: "",
    id:0,
    nume: "",
    prenume: "",
    email: "",
    telefon: "",
    numeOrganizatie: "",
    cont: "",
    password:'',
    logged:false,
  });
  const [userInfo,setUserInfo]=useState<User>(userState);
  useEffect(() => {
    if (userState.logged) {
      localStorage.setItem('userInfo', JSON.stringify(userState));
    }
  }, [userState]);

  useEffect(() => {
    const storedUserInfoString = localStorage.getItem('userInfo');
  
    if (storedUserInfoString !== null) {
      const storedUserInfo = JSON.parse(storedUserInfoString);
      setUserInfo((prevUserInfo) => {
       
        return { ...prevUserInfo, ...storedUserInfo };
      });
    }
  }, []); 
  
  const [loading,setLoading]=useState(true);
  const [rendered, setRendered] = useState(false);

  return (
    <Context.Provider value={{rendered,setRendered,setLoading,loading,userInfo,setUserInfo, userState,setUserState,projects, setProjects }}>
      <div className={s.app}>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/evenimente" element={<Evenimente />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/eveniment/:id" element={<Eveniment />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
