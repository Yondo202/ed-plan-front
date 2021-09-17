import React, { useEffect, useState, useContext } from 'react'
import CkEditor from "components/misc/CkEditor"
import{ Container, ButtonStyle2 } from "components/misc/CustomTheme";
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase"
import ContentParser from "components/misc/ContentParser"
import styled from 'styled-components';
import { FaYoutube } from "react-icons/fa"
import { TableExample } from "components/misc/Videos"

const ExportTwo2 = ({setProductName, modal}) => {
    const history = useHistory();
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const slug = useParams().slug;
    const [ errTxt, setErrTxt ] = useState(false);
    const [ fetchID, setFetchID ] = useState(null);
    const [ data, setData ] = useState('');
    // const [ selectedData, setSelectedData ] = useState({});

    const [ showVideo, setShowVideo ] = useState(false);
    

    useEffect(()=>{
        fetchData();
        FetchProductsOne();
    },[]);

    const fetchData = () =>{
        axios.get(`exportones?parent=${modal?ctx.targetProduct?.id:slug}&idd=${param}`, ).then(res=>{
            if(res.data.length){
                setData(res.data[0]?.body);
                setFetchID(res.data[0]?.id);
            }
        })
    }

    const FetchProductsOne = async () =>{
        axios.get(`export-products?idd=${param}&selected=true&id=${modal?ctx.targetProduct?.id:slug}`).then(res=>{
            if(res.data.length){
                // setSelectedData(res.data[0]);
                if(!modal){
                    setProductName(res.data[0].name);
                }
            }
        })
    }

    const clickHandle = () =>{
        if(data.length){
            ctx.loadFunc(true);
            if(fetchID){
                axios.put(`exportones/${fetchID}`, { body: data, idd: param, parent: slug, export_product: slug }).then(res=>{
                    ctx.alertFunc('green','Амжилттай',true );
                    ctx.loadFunc(false);
                    history.push(`/${param}/export/3/${slug}`);
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }else{
                axios.post(`exportones`, { body: data, idd: param, parent: slug, export_product: slug }).then(res=>{
                    axios.put(`totals/${ctx.total?.id}`, { exportthree: true, idd: param }).then(res=>{
                        ctx.alertFunc('green','Амжилттай',true );
                        ctx.loadFunc(false);
                        history.push(`/${param}/export/3/${slug}`);
                    }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }
        }else{
            setErrTxt(true);
            setTimeout(() => {
                setErrTxt(false);
            }, 4000)
            
        }
    }

    return (
        <>
        {modal? <ContentParser data={data} titleSm={`Өртгийн тооцоолол`} />
        :<Container>
            <ExampleVideo onClick={()=>setShowVideo(true)} style={{textAlign:"right"}}><div className="item">Хүснэгт үүсгэх заавар <FaYoutube /></div></ExampleVideo>
            {showVideo?<TableExample setShowVideo={setShowVideo} />:null}

            <CkEditor data={data} setData={setData} title={`Өртгийн тооцоолол`} />
            <ButtonStyle2 >
                <div className="errTxt">{errTxt&&`Утга оруулна уу`}</div>
                <button onClick={clickHandle}  className="myBtn">Хадгалах</button>
            </ButtonStyle2>
        </Container>}
            
        </>
    )
}

export default ExportTwo2

const ExampleVideo = styled.div`
    display:flex;
    justify-content:flex-end;
    .item{
        color:rgba(0,0,0,0.8);
        transition:all 0.3s ease;
        font-size:12px;
        cursor:pointer;
        font-weight:500;
        display:flex;
        align-items:center;
        border:1px solid rgba(0,0,0,0.1);
        padding:6px 18px;
        gap:8px;
        box-shadow:1px 1px 8px -7px;
        border-radius:6px;
        &:hover{
            box-shadow:1px 1px 13px -7px;
        }
        svg{
            font-size:18px;
        }
    }
`

