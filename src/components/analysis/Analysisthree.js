import React, { useEffect, useState, useContext } from 'react'
import CkEditor from "components/misc/CkEditor"
import{ Container, ButtonStyle2 } from "components/misc/CustomTheme";
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase"
import ContentParser from "components/misc/ContentParser"

const Analysisthree = ({modal}) => {
    const history = useHistory();
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const slug = useParams().slug;
    const [ errTxt, setErrTxt ] = useState(false);
    const [ fetchID, setFetchID ] = useState(null);
    const [ data, setData ] = useState('');

    useEffect(()=>{
        const fetchData = async () =>{
            await axios.get(`analysisthrees?parent=${modal?ctx.targetProduct?.id:slug}&idd=${param}`, ).then(res=>{
                 if(res.data.length){
                     setData(res.data[0].body);
                     setFetchID(res.data[0]?.id);
                 }
             })
         }
        fetchData();
    },[]);

    

    const clickHandle = () =>{
        if(data.length){
            ctx.loadFunc(true);
            if(fetchID){
                axios.put(`analysisthrees/${fetchID}`, { body: data, idd: param, parent:slug }).then(res=>{
                    axios.put(`totals/${ctx.total?.id}`, { analysisthree: true, idd: param}).then(res=>{
                        ctx.alertFunc('green','Амжилттай',true );
                        ctx.loadFunc(false);
                        history.push(`/${param}/analysis/4/${slug}`);
                    }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }else{
                axios.post(`analysisthrees`, { body: data, idd: param, parent:slug  }).then(res=>{
                    axios.put(`totals/${ctx.total?.id}`, { analysisthree: true, idd: param}).then(res=>{
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
        <>
        {modal? <ContentParser data={data} titleSm={`Экспортыг өрсөлдөөний орчин, өрсөлдөгчийн судалгаа - ${ctx.targetCountry?.country}`} titleBig={``} />
        :<Container>
            <CkEditor title={`Экспортыг өрсөлдөөний орчин, өрсөлдөгчийн судалгаа - ${ctx.targetCountry?.country}`} data={data} setData={setData} />

            <ButtonStyle2 >
                <div className="errTxt">{errTxt&&`Утга оруулна уу`}</div>
                <button onClick={clickHandle}  className="myBtn">Хадгалах</button>
            </ButtonStyle2>
        </Container>}
        
        </>
    )
}

export default Analysisthree
