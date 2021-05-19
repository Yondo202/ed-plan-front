import React from 'react'
import { HeaderTwo } from "components/misc/CustomTheme"
import { BrowserRouter as Switch, Route, useHistory, useLocation, useParams } from "react-router-dom";
import ExportOne from "components/export/ExportOne"
import ExportTwo from "components/export/ExportTwo"

function Intro_main() {
    const params = useParams().id;
    const history = useHistory();
    let loc = useLocation(); 

    const clickHanlde = (element) => {
        switch (element) {
            case "show1":history.push(`/${params}/export/1`); break;
            case "show2": history.push(`/${params}/export/2`); break;
            case "show3": history.push(`/${params}/export/3`); break;
            case "show4": history.push(`/${params}/export/4`); break;
            case "show5": history.push(`/${params}/export/5`); break;
            default:
        }
    }

    return (
        <HeaderTwo className="container">
            <div className="smMenuPar">
                <button onClick={()=>clickHanlde("show1")} className={`itemsPar ${loc.pathname===`/${params}/export/1`&&`itemsPar2`}`}><span>Экспортын бүтээгдэхүүн</span></button>
                <button onClick={()=>clickHanlde("show2")} className={`itemsPar ${loc.pathname===`/${params}/export/2`&&`itemsPar2`}`} ><span>Өртгийн тооцоолол</span></button>
                {/* <button onClick={()=>clickHanlde("show5")} className={`itemsPar ${loc.pathname===`/${params}/export/5`&&`itemsPar2`}`}><span>Төслийн баг</span></button> */}
            </div>
            <Route exact path="/:id/export/1"><ExportOne /></Route>
            <Route exact path="/:id/export/2"><ExportTwo /></Route>
        </HeaderTwo>
    )
}

export default Intro_main