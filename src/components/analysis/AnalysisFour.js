import React, { useEffect, useState, useContext } from 'react'
import CkEditor from "components/misc/CkEditor"
import{ Container, ButtonStyle2 } from "components/misc/CustomTheme";
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase"
import ContentParser from "components/misc/ContentParser"

const Analysisthree = ({ modal }) => {
    const history = useHistory();
    const ctx = useContext(UserContext);
    const { id, slug } = useParams();
    const [ errTxt, setErrTxt ] = useState(false);
    const [ fetchID, setFetchID ] = useState(null);
    const [ data, setData ] = useState('');

    useEffect(()=>{
        const fetchData = async () =>{
            await axios.get(`analysisfours?parent=${modal?ctx.targetProduct?.id:slug}&idd=${id}`).then(res=>{
                 if(res.data.length){
                     setData(res.data[0]?.body);
                     setFetchID(res.data[0]?.id);
                 }else{
                     setData('');
                     setFetchID(null);
                 }
             })
        }
        fetchData();
    },[]);

    const clickHandle = () =>{
        if(data.length){
            ctx.loadFunc(true);
            if(fetchID){
                axios.put(`analysisfours/${fetchID}`, { body: data, idd: id, parent:slug }).then(res=>{
                    ctx.alertFunc('green','Амжилттай',true );
                    ctx.loadFunc(false);
                    history.push(`/${id}/analysis/5/${slug}`);
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }else{
                axios.post(`analysisfours`, { body: data, idd: id, parent:slug  }).then(res=>{
                    axios.put(`totals/${ctx.total?.id}`, { analysisfour: true, idd: id}).then(res=>{
                        ctx.alertFunc('green','Амжилттай',true );
                        ctx.loadFunc(false);
                        history.push(`/${id}/analysis/5/${slug}`);
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
        {modal? <ContentParser data={data} titleSm={`SWOT шинжилгээ - ${ctx.targetCountry?.country}`} titleBig={``} />
        :<Container>
            <CkEditor title={`SWOT шинжилгээ - ${ctx.targetCountry?.country}`} data={data} setData={setData} />

          {!modal&&<ButtonStyle2 >
                <div className="errTxt">{errTxt&&`Утга оруулна уу`}</div>
                <button onClick={clickHandle}  className="myBtn">Хадгалах</button>
            </ButtonStyle2>}  
        </Container>}
        </>
    )
}

export default Analysisthree
