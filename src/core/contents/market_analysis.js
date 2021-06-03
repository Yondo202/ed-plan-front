import React, { useContext } from 'react'
import UserContext from "global/UserContext"
import { HeaderTwo } from "components/misc/CustomTheme"
import { BrowserRouter as Switch, Route, useLocation, useHistory, useParams } from "react-router-dom";
import AnalysisOne from "components/analysis/one/AnalysisMain"
import AnalysisTwo from "components/analysis/two/AnalysisMain"
import Analysisthree from "components/analysis/Analysisthree"
import AnalysisFour from "components/analysis/AnalysisFour"
import AnalysisFive from "components/analysis/five/AnalysisFiveMain"


function Market_analysis() {
    const history = useHistory();
    const ctx = useContext(UserContext);
    const params = useParams().id;
    let loc = useLocation(); 

    const clickHanlde = (element) => {
        switch (element) {
            case "show1":history.push(`/${params}/analysis/1/${ctx.productId}`); break;
            case "show2": history.push(`/${params}/analysis/2/${ctx.productId}`); break;
            case "show3": history.push(`/${params}/analysis/3/${ctx.productId}`); break;
            case "show4": history.push(`/${params}/analysis/4/${ctx.productId}`); break;
            case "show5": history.push(`/${params}/analysis/5/${ctx.productId}`); break;
            default:
        }
    }

    return (
        <HeaderTwo className="container">
            <div className="smMenuPar">
                <button onClick={()=>clickHanlde("show1")} disabled={ctx.total?.analysisone?false:true} className={`itemsPar ${ctx.total?.analysisone&&`Active`} ${loc.pathname.includes(`/analysis/1`)&&`itemsPar2`}`}><span>Экспортын зах зээлийн судалгаа</span></button>
                <button onClick={()=>clickHanlde("show2")} disabled={ctx.total?.analysistwo?false:true} className={`itemsPar ${ctx.total?.analysistwo&&`Active`} ${loc.pathname.includes(`/analysis/2`)&&`itemsPar2`}`}><span>Зорилтот зах зээл</span></button>
                <button onClick={()=>clickHanlde("show3")} disabled={ctx.total?.analysisthree?false:true} className={`itemsPar ${ctx.total?.analysisthree&&`Active`} ${loc.pathname.includes(`/analysis/3`)&&`itemsPar2`}`} ><span>Экспортыг өрсөлдөөний орчин, өрсөлдөгчийн судалгаа</span></button>
                <button onClick={()=>clickHanlde("show4")} disabled={ctx.total?.analysisfour?false:true} className={`itemsPar ${ctx.total?.analysisfour&&`Active`} ${loc.pathname.includes(`/analysis/4`)&&`itemsPar2`}`} ><span>SWOT шинжилгээ</span></button>
                <button onClick={()=>clickHanlde("show5")} disabled={ctx.total?.analysisfive?false:true} className={`itemsPar ${ctx.total?.analysisfive&&`Active`} ${loc.pathname.includes(`/analysis/5`)&&`itemsPar2`}`} ><span>Экспортын борлуулалтын төлөвлөгөө</span></button>
            </div>

            <Route exact path="/:id/analysis/1/:slug"><AnalysisOne /></Route>
            <Route exact path="/:id/analysis/2/:slug"><AnalysisTwo /></Route>
            <Route exact path="/:id/analysis/3/:slug"><Analysisthree /></Route>
            <Route exact path="/:id/analysis/4/:slug"><AnalysisFour /></Route>
            <Route exact path="/:id/analysis/5/:slug"><AnalysisFive /></Route>
        </HeaderTwo>
    )
}

export default Market_analysis