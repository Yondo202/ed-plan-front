import React,{useContext} from 'react'
import { BrowserRouter as  Switch, Route, } from "react-router-dom";
import Home from "core/home";
import IntroMain from "core/contents/intro_main"
import BusinessMain from "core/contents/business_info"
import Menu from "core/menu"
import UserContext from "global/UserContext"
import LoginMsg from "components/misc/LoginMsg"
import ExportMain from "core/contents/export_service"
import Marketing from 'core/contents/marketing'
import PlanReport from "core/contents/plan_report"
import Analysis from "core/contents/market_analysis"
import FirstPage from "components/first_page/FirstPage"



const RouterMain = () => {
    const ctx = useContext(UserContext);
    return (
        <>
            <Menu />
            {ctx.approve?.idd?ctx.approve?.approve === true?
            <>
            <Route path="/:id/" component={Home} exact />
            <Route path="/:id/businessinfo" component={BusinessMain} />
            <Route path="/:id/intro" component={IntroMain} />
            <Route path="/:id/export" component={ExportMain} />
            <Route path="/:id/analysis" component={Analysis} />
            <Route path="/:id/marketing" component={Marketing} />
            <Route path="/:id/report" component={PlanReport} />
            <Route path="/:id/firstpage" component={FirstPage} />
            </>: <LoginMsg text="Системд нэвтрээгүй байна" />:
            <div />}
        </>
    )
}

export default RouterMain

