import React, { useContext, useEffect, useState  } from 'react'
import { HeaderTwo } from "components/misc/CustomTheme"
import { BrowserRouter as Switch, Route, useHistory, useLocation, useParams } from "react-router-dom";
import BusinessInfoOne from "components/business_info/busOneMain"
import BusinessInfoDesc from "components/business_info/businessInfoDesc"
import BusinessInfoTwo from "components/business_info/busTwoMain"


function Business_info() {
    const params = useParams().id;
    const history = useHistory();
    let loc = useLocation(); 

    const clickHanlde = (element) => {
        switch (element) {
            case "show1":history.push(`/${params}/businessinfo/1`); break;
            case "show2": history.push(`/${params}/businessinfo/2`); break;
            case "show3": history.push(`/${params}/businessinfo/3`); break;
            default:
        }
    }

    return (
        <HeaderTwo className="container">
            <div className="smMenuPar">
                <button onClick={()=>clickHanlde("show1")} className={`itemsPar ${loc.pathname===`/${params}/businessinfo/1`&&`itemsPar2`}`}><span>Танилцуулга</span></button>
                <button onClick={()=>clickHanlde("show2")} className={`itemsPar ${loc.pathname===`/${params}/businessinfo/2`&&`itemsPar2`}`}><span>Борлуулалтын мэдээлэл</span></button>
                <button onClick={()=>clickHanlde("show3")} className={`itemsPar ${loc.pathname===`/${params}/businessinfo/3`&&`itemsPar2`}`} ><span>Санхүүгийн нөөц, боломж</span></button>
            </div>

            <Route exact path="/:id/businessinfo/1"><BusinessInfoDesc /></Route>
            <Route exact path="/:id/businessinfo/2"><BusinessInfoOne /></Route>
            <Route exact path="/:id/businessinfo/3"><BusinessInfoTwo /></Route>
        </HeaderTwo>
    )
}

export default Business_info