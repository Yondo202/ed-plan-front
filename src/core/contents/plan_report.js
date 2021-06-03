import React, { useContext } from 'react'
import { HeaderTwo } from "components/misc/CustomTheme"
import { BrowserRouter as Switch, Route, useLocation, useParams, useHistory } from "react-router-dom";
import FinancePlan from "components/plan_report/FinancePlan"
import TotalReport from "components/plan_report/TotalReport"
import UserContext from "global/UserContext"


function Intro_main() {
    const history = useHistory();
    const ctx = useContext(UserContext);
    const params = useParams().id;
    let loc = useLocation(); 

    const clickHanlde = (element) => {
        switch (element) {
            case "show1":history.push(`/${params}/report/1`); break;
            case "show2": history.push(`/${params}/report/2`); break;
            default:
        }
    }

    return (
        <HeaderTwo >
            <div className="smMenuPar container">
                <button onClick={()=>clickHanlde("show1")} disabled={ctx.total?.financeplan?false:true} className={`itemsPar ${ctx.total?.financeplan&&`Active`} ${loc.pathname===`/${params}/report/1`&&`itemsPar2`}`}><span>Үйл ажиллагаа болон санхүүгийн төлөвлөгөө</span></button>
                <button onClick={()=>clickHanlde("show2")} disabled={ctx.total?.totalreport?false:true} className={`itemsPar ${ctx.total?.totalreport&&`Active`} ${loc.pathname===`/${params}/report/2`&&`itemsPar2`}`} ><span>Удирдлагын багийн уулзалт, тайлан</span></button>
            </div>

            <Route exact path={`/:id/report/1`}><div className="container"><FinancePlan /></div> </Route>
            <Route exact path={`/:id/report/2`}><div style={{maxWidth:"1700px"}} className="container-fluid"><TotalReport /></div></Route>

        </HeaderTwo>
    )
}

export default Intro_main

