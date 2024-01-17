import { createContext } from "react";
import { Projects, menu, menuType } from "./pages/evenimente/models";
import { User } from "./pages/Registration/models";

export const Context = createContext<{
  projects: Projects[];
  setProjects: React.Dispatch<React.SetStateAction<Projects[]>>;
  userState: User,
  setUserState: React.Dispatch<React.SetStateAction<User>>
  userInfo: User 
  setUserInfo: React.Dispatch<React.SetStateAction<User>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  loading:boolean
  rendered: boolean
  setRendered: React.Dispatch<React.SetStateAction<boolean>>
}>({rendered:false,setRendered:()=>{}, loading:true,setLoading:()=>{},projects: [], setProjects: () => {},userState:{id:0,functie: "",nume: "",prenume: "",email: "",telefon: "",numeOrganizatie: "",cont: "",password:'',logged:false},setUserState:()=>{},userInfo:{id:0,functie: "",nume: "",prenume: "",email: "",telefon: "",numeOrganizatie: "",cont: "",password:'',logged:false},setUserInfo:()=>{} });
