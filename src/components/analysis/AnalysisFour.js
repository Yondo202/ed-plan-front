import React, { useEffect, useState, useContext } from 'react'
import CkEditor from "components/misc/CkEditor"
import{ Container, ButtonStyle2 } from "components/misc/CustomTheme";
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase"

const Analysisthree = () => {
    const history = useHistory();
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const slug = useParams().slug;
    const [ errTxt, setErrTxt ] = useState(false);
    const [ fetchID, setFetchID ] = useState(null);
    const [ data, setData ] = useState('');

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = () =>{
        axios.get(`analysisfours?parent=${slug}&idd=${param}`, ).then(res=>{
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
                axios.put(`analysisfours/${fetchID}`, { body: data, idd: param, parent:slug }).then(res=>{
                    ctx.alertFunc('green','Амжилттай',true );
                    ctx.loadFunc(false);
                    history.push(`/${param}/analysis/4/${slug}`);
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }else{
                axios.post(`analysisfours`, { body: data, idd: param, parent:slug  }).then(res=>{
                    axios.put(`totals/${ctx.total?.id}`, { analysisfour: true, idd: param}).then(res=>{
                        ctx.alertFunc('green','Амжилттай',true );
                        ctx.loadFunc(false);
                        history.push(`/${param}/analysis/4/${slug}`);
                    }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }
        }else{
            setErrTxt(true);
            setTimeout(() => {
                setErrTxt(false);
            }, 5000)
        }
    }

    return (
        <Container>
            <CkEditor title="SWOT шинжилгээ" data={data?.body} setData={setData} />

            <ButtonStyle2 >
                 <div className="errTxt">{errTxt&&`Утга оруулна уу`}</div>
                <button onClick={clickHandle}  className="myBtn">Хадгалах</button>
            </ButtonStyle2>
        </Container>
    )
}

export default Analysisthree
