import React from 'react'
import ProjectIntro from 'components/intro/ProjectIntro'
import { HeaderTwo } from "components/misc/CustomTheme"
import { BrowserRouter as Switch, Route, useHistory, useLocation, useParams } from "react-router-dom";
import FinancePlan from "components/plan_report/FinancePlan"
import TotalReport from "components/plan_report/TotalReport"


function Intro_main() {
    const params = useParams().id;
    const history = useHistory();
    let loc = useLocation(); 

    const clickHanlde = (element) => {
        switch (element) {
            case "show1":history.push(`/${params}/report/1`); break;
            case "show2": history.push(`/${params}/report/2`); break;
            default:
        }
    }

    return (
        <HeaderTwo className="container">
            <div className="smMenuPar">
                <button onClick={()=>clickHanlde("show1")} className={`itemsPar ${loc.pathname===`/${params}/report/1`&&`itemsPar2`}`}><span>Үйл ажиллагаа болон санхүүгийн төлөвлөгөө</span></button>
                <button onClick={()=>clickHanlde("show2")} className={`itemsPar ${loc.pathname===`/${params}/report/2`&&`itemsPar2`}`} ><span>Удирдлагын багийн уулзалт, тайлан</span></button>
            </div>

            <Route exact path={`/:id/report/1`}><FinancePlan /></Route>
            <Route exact path={`/:id/report/2`}><TotalReport /></Route>

        </HeaderTwo>
    )
}

export default Intro_main

