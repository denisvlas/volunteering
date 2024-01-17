import { createContext } from "react";
import { Projects } from "../evenimente/models";

export const MainContext = createContext<{
    projects: Projects[] | []
    setProjects: React.Dispatch<React.SetStateAction<[] | Projects[]>>
}>({projects:[],setProjects:()=>{}});
