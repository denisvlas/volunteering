import { createContext } from "react";
import {  menuType,menu, Projects, Transactions } from "./models";


export const SectionContext = createContext<{
  section: menuType;
  setSection: React.Dispatch<React.SetStateAction<menuType>>;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showMenu: boolean;
  setProject: React.Dispatch<React.SetStateAction<Projects | undefined>>;
  p: Projects | undefined;
  id: string | undefined;
  showTr: boolean;
  setShowTr: React.Dispatch<React.SetStateAction<boolean>>;
  editedValues: {
    img:string
    inceput: Date;
    sfarsit: Date;
    strada: string;
    oras: string;
    tara: string;
    categorie: string;
    descriere: string;
    nume: string;
    status: string;
    suma_necesara:string
    suma:string

}
volunteerProjects: boolean
setVolunteerProjects: React.Dispatch<React.SetStateAction<boolean>>
setEditedValues: React.Dispatch<React.SetStateAction<{
  img:string,
  inceput: Date;
  sfarsit: Date;
  strada: string;
  oras: string;
  tara: string;
  categorie: string;
  descriere: string;
  nume: string;
  status: string;
  suma_necesara:string
  suma:string
}>>
setEditToggle: React.Dispatch<React.SetStateAction<boolean>>
editToggle:boolean
handleInputChange: (field: string, value: string) => void
handleSaveChanges: () => void
}>({
  setVolunteerProjects:()=>{},
  volunteerProjects:false,
  handleSaveChanges:()=>{},
  handleInputChange:()=>{},
  editToggle:false,
  setEditToggle:()=>{},
 editedValues: {
    img:"",
    inceput: new Date(),
    sfarsit: new Date(),
    strada: "",
    oras: "",
    tara: "",
    categorie: "",
    descriere: "",
    nume: "",
    status: "",
    suma_necesara:"",
    suma:""
  },
  setEditedValues:()=>{},
  section: menu.InformatiiGenerale,
  setSection: () => {},
  showMenu: false,
  setShowMenu: () => {},
  setProject: () => {},
  p: undefined,
  id: undefined,
  setShowTr: () => {},
  showTr: false,
});
