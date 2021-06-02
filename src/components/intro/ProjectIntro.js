import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import CkEditor from "components/misc/CkEditor"
import { ButtonStyle2, Container } from "components/misc/CustomTheme"
import axios from "global/axiosbase"
import ContentParser from "components/misc/ContentParser"

const ProjectIntro = ({ modal }) => {
    const history = useHistory();
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const [ errTxt, setErrTxt ] = useState(false);
    const [ fetchID, setFetchID ] = useState(null);
    const [ data, setData ] = useState('');

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = () =>{
        axios.get(`projectinfos?idd=${param}`, ).then(res=>{
            if(res.data.length){
                setData(res.data[0]);
                setFetchID(res.data[0]?.id);
            }
        })
    }
    const clickHandle = () =>{
        if(data.length){
            ctx.loadFunc(true);
            if(fetchID){
                axios.put(`projectinfos/${fetchID}`, { body: data, idd: param }).then(res=>{
                    ctx.alertFunc('green','Амжилттай',true );
                    ctx.loadFunc(false);
                    history.push(`/${param}/intro/2`);
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }else{
                axios.post(`projectinfos`, { body: data, idd: param }).then(res=>{
                    axios.post(`totals`, { projectinfo: true, idd: param }).then(res=>{
                        ctx.alertFunc('green','Амжилттай',true );
                        ctx.loadFunc(false);
                        history.push(`/${param}/intro/2`);
                    }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }
        }else{
            setErrTxt(true);
        }
    }

    return (
        <>
            {modal? <ContentParser data={data?.body} titleSm={``} titleBig={`I. Төслийн товч танилцуулга`} />
            :<Container>
                <CkEditor data={data?.body} setData={setData} />
                <ButtonStyle2 >
                    <div className="errTxt">{errTxt&&`Утга оруулна уу`}</div>
                    <button onClick={clickHandle}  className="myBtn">Хадгалах</button>
                </ButtonStyle2>
            </Container>}
        </>
    )
}

export default ProjectIntro



