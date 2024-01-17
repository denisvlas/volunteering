import React, { useContext } from 'react'
import s from '../pages/evenimente/Eveniment.module.css'
import { menuType,menu, Projects } from '../pages/evenimente/models'
import { SectionContext } from '../pages/evenimente/context';
import { Context } from '../context';
import { functiiType, functiiTypeBD } from '../pages/Registration/models';

interface P{
    p: Projects
}

function PopInfoMenu({p}:P) {
    const { section, setSection,showMenu,setShowMenu } = useContext(SectionContext);
    const{userInfo}=useContext(Context)
    const meniu = [menu.InformatiiGenerale, menu.Necesitati];
    console.log(p);
    
    return (
        <div className={s['pop-info-menu']}onMouseLeave={() => setShowMenu(false)}>
            {meniu.map((m) => (
                <span key={m} onClick={() => setSection(m)}>
                    {m}
                </span>
            ))}
            {(parseInt(p.suma_necesara)>0)&&<span onClick={()=>setSection(menu.Finantari)}>{menu.Finantari}</span>}
            {userInfo.functie===functiiTypeBD.voluntari||userInfo.functie===functiiTypeBD.sponsori?<span onClick={() => setSection(menu.Donatie)}>Ajutor material</span>:<span onClick={() => setSection(menu.Donatie)}>{menu.Donatie}</span>}

        </div>
    );
}

export default PopInfoMenu;

