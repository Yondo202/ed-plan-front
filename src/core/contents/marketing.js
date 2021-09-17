import React, { useEffect, useState, useContext } from 'react'
import { HeaderTwo } from "components/misc/CustomTheme"
import { BrowserRouter as Switch, Route, useLocation, useParams, useHistory } from "react-router-dom";
import MarketingMain from "components/marketing/MarketingMain"
import UserContext from "global/UserContext"

function Intro_main({modal}) {
    const history = useHistory();
    const ctx = useContext(UserContext);
    const params = useParams().id;
    let loc = useLocation();
    const [ targeted, setTargeted ] = useState();

    useEffect(()=>{
        setTargeted(`${ctx.targetProduct?.name} ⇀ ${ctx.targetCountry?.country}`);
    },[])

    const clickHanlde = (element) => {
        switch (element) {
            case "show1":history.push(`/${params}/marketing/1`); break;
            case "show2": history.push(`/${params}/marketing/2`); break;
            case "show3": history.push(`/${params}/marketing/3`); break;
            case "show4": history.push(`/${params}/marketing/4`); break;
            case "show5": history.push(`/${params}/marketing/5`); break;
            default:
        }
    }

    return (
        <>
          {modal? 
            <>
                {marketingData.map((el,ind)=>{
                    return(
                        <MarketingMain key={ind} modal={modal} field={el.field} code={el.code} title={el.title} modalPar={el.code===1?true:false} targeted={el.code===1?targeted:``}/>
                    )
                })}</>
            :<HeaderTwo className="container">
                <div className="smMenuPar">
                    <button onClick={()=>clickHanlde("show1")} disabled={ctx.total?.m_one?false:true} className={`itemsPar ${ctx.total?.m_one&&`Active`} ${loc.pathname===`/${params}/marketing/1`&&`itemsPar2`}`}><span>Бүтээгдэхүүн</span></button>
                    <button onClick={()=>clickHanlde("show2")} disabled={ctx.total?.m_two?false:true} className={`itemsPar ${ctx.total?.m_two&&`Active`} ${loc.pathname===`/${params}/marketing/2`&&`itemsPar2`}`} ><span>Үнэ</span></button>
                    <button onClick={()=>clickHanlde("show3")} disabled={ctx.total?.m_three?false:true} className={`itemsPar ${ctx.total?.m_three&&`Active`} ${loc.pathname===`/${params}/marketing/3`&&`itemsPar2`}`}><span>Зах зээлд нэвтрэлт, хуваарилалтын сувгууд</span></button>
                    <button onClick={()=>clickHanlde("show4")} disabled={ctx.total?.m_four?false:true} className={`itemsPar ${ctx.total?.m_four&&`Active`} ${loc.pathname===`/${params}/marketing/4`&&`itemsPar2`}`}><span>Идэвхижүүлэлт</span></button>
                    <button onClick={()=>clickHanlde("show5")} disabled={ctx.total?.m_five?false:true} className={`itemsPar ${ctx.total?.m_five&&`Active`} ${loc.pathname===`/${params}/marketing/5`&&`itemsPar2`}`}><span>Үйл явц</span></button>
                </div>

                {/* <Route exact path="/:id/marketing/1"><MarketingMain title={"one"}/></Route>
                <Route exact path="/:id/marketing/2"><MarketingMain title={"two"}/></Route>
                <Route exact path="/:id/marketing/3"><MarketingMain title={"three"}/></Route> */}

                {marketingData.map((el,ind)=>{
                    return(
                        <Route key={ind} exact path={`/:id/marketing/${el.code}`}><MarketingMain field={el.field} code={el.code} title={el.title} targeted={targeted} /></Route>
                    )
                })}

            </HeaderTwo>}
        </>
    )
}

export default Intro_main

const marketingData = [
    { code:1, field: "m_one", title: "Бүтээгдэхүүн", },
    { code:2, field: "m_two", title: "Үнэ" },
    { code:3, field: "m_three", title: "Зах зээлд нэвтрэлт, хуваарилалтын сувгууд" },
    { code:4, field: "m_four", title: "Идэвхижүүлэлт" },
    { code:5, field: "m_five", title: "Үйл явц" },
]