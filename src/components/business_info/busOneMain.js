import React, { useEffect, useState, useContext } from 'react';
import {Container, ButtonStyle2} from "components/misc/CustomTheme";
import BusinessInfoOne from "components/business_info/businessInfoOne"
import BusinessInfoTwo from "components/business_info/businessInfoTwo"
import axios from "global/axiosbase"
import { useParams, useHistory } from 'react-router-dom';
import UserContext from "global/UserContext"

const BusOneMain = ({ modal }) => {
    const ctx = useContext(UserContext);
    const history = useHistory();
    const param = useParams().id;
    const [ cond, setCond ] = useState(false);
    const [ countOne, setCountOne ] = useState(0);
    const [ countTwo, setCountTwo ] = useState(0);
    const [ countThree, setCountThree ] = useState(0);

    useEffect(()=>{
        const fetchOne = async () =>{
            await axios.get(`busones/count?idd=${param}`).then(res=>{
                setCountOne(res.data);
            })
            await axios.get(`bustwos/count?idd=${param}`).then(res=>{
                setCountTwo(res.data);
            })
            await axios.get(`busthrees/count?idd=${param}`).then(res=>{
                setCountThree(res.data);
            })
        }
        fetchOne();
    },[cond]);

    console.log(`countOne`, countOne);
    console.log(`countTwo`, countTwo);
    console.log(`countThree`, countThree);

    
    const clickHandle = () =>{
        if(countOne > 0 && countTwo > 1 && countThree > 1 ){
            ctx.loadFunc(true);
            axios.put(`totals/${ctx.total?.id}`, { busone: true, idd: param }).then(res=>{
                ctx.alertFunc('green','Амжилттай',true );
                ctx.loadFunc(false);
                history.push(`/${param}/businessinfo/3`);
            });
        }else{
            ctx.alertFunc("orange", "Мэдээллээ гүйцэд оруулна уу", true);
        }
    }

    return (
        <Container style={modal&&{padding:"0px 0px"}}>
            <BusinessInfoOne modal={modal} cond2={cond} setCond2={setCond}  />
            <BusinessInfoTwo
                title={"Бүтээгдэхүүн болон борлуулалтын сувгийн харьцуулсан борлуулалтын мэдээ"}
                subTitle={{ one: "Дотоодын борлуулалтын голлох бүтээгдэхүүн (ам.дол)", two: "Дотоодын борлуулалтын суваг (ам.дол)" }}
                url={"bustwos"}
                urlDetail={"bustwodetails"}
                helpField={"bustwo"}
                helpField2={"bustwodetails"}
                cond2={cond}
                setCond2={setCond}
                modal={modal}
            />

            <BusinessInfoTwo
                title={"Экспортын борлуулалтын задаргаа"}
                subTitle={{ one: "Экспортын борлуулалтын голлох бүтээгдэхүүн (ам.дол)", two: "Экспорт хийгдсэн улсаар (ам.дол)" }}
                url={"busthrees"}
                urlDetail={"busthreedetails"}
                helpField={"busthree"}
                helpField2={"busthreedetails"}
                cond2={cond}
                setCond2={setCond}
                modal={modal}
            />
            
           {!modal&&<ButtonStyle2 >
                <div className="errTxt"></div>
                <button onClick={clickHandle}  className="myBtn">Дараагийн</button>
            </ButtonStyle2>}
        </Container>
    )
}

export default BusOneMain


