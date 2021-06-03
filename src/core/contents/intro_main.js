import React, { useContext } from 'react'
import UserContext from "global/UserContext"
import ProjectIntro from 'components/intro/ProjectIntro'
import { HeaderTwo } from "components/misc/CustomTheme"
import { BrowserRouter as Switch, Route, useLocation, useParams, useHistory } from "react-router-dom";
import InfoOne from "components/intro/InfoOne"
import InfoTwo from "components/intro/infoTwo"
import InfoThree from "components/intro/InfoThree"


function Intro_main() {
    const history = useHistory();
    const ctx = useContext(UserContext);
    const params = useParams().id;
    let loc = useLocation(); 

    const clickHanlde = (element) => {
        switch (element) {
            case "show1":history.push(`/${params}/intro/1`); break;
            case "show2": history.push(`/${params}/intro/2`); break;
            case "show3": history.push(`/${params}/intro/3`); break;
            case "show4": history.push(`/${params}/intro/4`); break;
            case "show5": history.push(`/${params}/intro/5`); break;
            default:
        }
    }
    // onClick={()=>clickHanlde("show1")} 
    return (
        <HeaderTwo className="container">
            <div className="smMenuPar">
                <button onClick={()=>clickHanlde("show1")} disabled={ctx.total?.projectinfo?false:true} className={`itemsPar ${ctx.total?.projectinfo&&`Active`} ${loc.pathname===`/${params}/intro/1`&&`itemsPar2`}`}><span>Төслийн товч танилцуулга</span></button>
                <button onClick={()=>clickHanlde("show2")} disabled={ctx.total?.infoone?false:true} className={`itemsPar ${ctx.total?.infoone&&`Active`} ${loc.pathname===`/${params}/intro/2`&&`itemsPar2`}`} ><span>Бүтэц, зохион байгуулалт</span></button>
                <button onClick={()=>clickHanlde("show3")} disabled={ctx.total?.infotwo?false:true} className={`itemsPar ${ctx.total?.infotwo&&`Active`} ${loc.pathname===`/${params}/intro/3`&&`itemsPar2`}`}><span>Гэрчилгээ, үйл ажиллагааны мэдээлэл</span></button>
                <button onClick={()=>clickHanlde("show4")} disabled={ctx.total?.infothree?false:true} className={`itemsPar ${ctx.total?.infothree&&`Active`} ${loc.pathname===`/${params}/intro/4`&&`itemsPar2`}`}><span>Эцсийн өмчлөгчдийн мэдээлэл</span></button>
            </div>

            <Route exact path="/:id/intro/1"><ProjectIntro /></Route>
            <Route exact path="/:id/intro/2"><InfoOne /></Route>
            <Route exact path="/:id/intro/3"><InfoTwo /></Route>
            <Route exact path="/:id/intro/4"><InfoThree /></Route>
        </HeaderTwo>
    )
}

export default Intro_main