import React, { useEffect, useState, useContext } from 'react';
import CkEditor from "components/misc/CkEditor";
import {Container, ButtonStyle2} from "components/misc/CustomTheme";
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase"

const BusinessInfoOne = () => {
    const history = useHistory();
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const [ fetchID, setFetchID ] = useState(null);
    const [ data, setData ] = useState('');
    const [ errTxt, setErrTxt ] = useState(false);

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = () =>{
        axios.get(`businessinfoones?idd=${param}`, ).then(res=>{
            setData(res.data[0]);
            setFetchID(res.data[0]?.id);
        })
    }
   
    const clickHandle = () =>{
        if(data){
            ctx.loadFunc(true);
            if(fetchID){
                axios.put(`businessinfoones/${fetchID}`, { body: data, idd: param }).then(res=>{
                    ctx.alertFunc('green','Амжилттай',true );
                    ctx.loadFunc(false);
                    history.push(`/${param}/businessinfo/2`);
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }else{
                axios.post(`businessinfoones`, { body: data, idd: param }).then(res=>{
                    axios.put(`totals/${ctx.total?.id}`, { businessone: true, idd: param }).then(res=>{
                        ctx.alertFunc('green','Амжилттай',true );
                        ctx.loadFunc(false);
                        history.push(`/${param}/businessinfo/2`);
                    }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }
        }else{
            setErrTxt(true);
        }
    }

    return (
        <Container>
            <CkEditor data={data?.body} setData={setData} height={20} title={`Танилцуулга`} />


            <ButtonStyle2 >
                 <div className="errTxt">{errTxt&&`Утга оруулна уу`}</div>
                <button onClick={clickHandle}  className="myBtn">Хадгалах</button>
            </ButtonStyle2>
        </Container>
    )
}

export default BusinessInfoOne
