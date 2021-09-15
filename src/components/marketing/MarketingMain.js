import React, { useEffect, useState, useContext } from 'react'
import CkEditor from "components/misc/CkEditor"
import{ Container, ButtonStyle2 } from "components/misc/CustomTheme";
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase"
import ContentParser from "components/misc/ContentParser"

const MarketingMain = ({field, title, code, targeted, modal, modalPar}) => {
    const history = useHistory();
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const [ errTxt, setErrTxt ] = useState(false);
    const [ fetchID, setFetchID ] = useState(null);
    const [ data, setData ] = useState('');
    const [ cstmField, setCstmField ] = useState({});

    useEffect(()=>{
        fetchData();
        let obj = {};
        obj[field] = true;
        setCstmField(obj);
    },[]);

    const fetchData = () =>{
        axios.get(`marketings?${field}=true&idd=${param}`, ).then(res=>{
            if(res.data.length){
                setData(res.data[0]?.body);
                setFetchID(res.data[0]?.id);
            }
        })
    }

    const clickHandle = () =>{
        if(data.length){
            ctx.loadFunc(true);
            if(fetchID){
                axios.put(`marketings/${fetchID}`, { body: data, idd: param, ...cstmField, title: title }).then(res=>{
                    ctx.alertFunc('green','Амжилттай',true );
                    ctx.loadFunc(false);
                    if(field === "m_five"){
                        history.push(`/${param}/report/1`);
                    }else{
                        history.push(`/${param}/marketing/${code + 1}`);
                    }
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }else{
                axios.post(`marketings`, { body: data, idd: param, ...cstmField, title: title }).then(res=>{
                    axios.put(`totals/${ctx.total?.id}`, { ...cstmField, idd: param }).then(res=>{
                        ctx.alertFunc('green','Амжилттай',true );
                        ctx.loadFunc(false);
                        if(field === "m_five"){
                            history.push(`/${param}/report/1`);
                        }else{
                            history.push(`/${param}/marketing/${code + 1}`);
                        }
                    }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }
        }else{
            setErrTxt(true);
        }
    }

    return (
        <>
            {modal? <ContentParser data={data} titleSm={`${title}`} titleBig={modalPar?`VI. Маркетингийн стратеги`:``} />
            :<Container>
                <CkEditor data={data} title={title} setData={setData} />

                <ButtonStyle2 >
                    <div className="errTxt">{errTxt&&`Утга оруулна уу`}</div>
                    <button onClick={clickHandle}  className="myBtn">Хадгалах</button>
                </ButtonStyle2>
            </Container>}
        </>
    )
}

export default MarketingMain
