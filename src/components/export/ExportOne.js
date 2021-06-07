import React, { useEffect, useState, useContext } from 'react'
import CkEditor from "components/misc/CkEditor"
import{ Container, ButtonStyle2 } from "components/misc/CustomTheme";
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase"
import ContentParser from "components/misc/ContentParser"

const ExportOne = ({setProductName, modal}) => {
    const history = useHistory();
    const ctx = useContext(UserContext);
    const param = useParams().id;
    const slug = useParams().slug;
    const [ errTxt, setErrTxt ] = useState(false);
    const [ fetchID, setFetchID ] = useState(null);
    const [ data, setData ] = useState('');
    const [ selectedData, setSelectedData ] = useState({});

    useEffect(()=>{
        fetchData();
        FetchProductsOne();
    },[]);

    const fetchData = () =>{
        axios.get(`exporttwos?parent=${modal?ctx.targetProduct?.id:slug}&idd=${param}`, ).then(res=>{
            if(res.data.length){
                setData(res.data[0]?.body);
                setFetchID(res.data[0]?.id);
            }
        })
    }

    const FetchProductsOne = async () =>{

        axios.get(`export-products?idd=${param}&selected=true&id=${modal?ctx.targetProduct?.id:slug}`).then(res=>{
            if(res.data.length){
                setSelectedData(res.data[0]);
                if(!modal){
                    setProductName(res.data[0].name);
                }
            }
        })
        // axiosGraphql.post(`graphql`, { query: `query{
        //     exportProducts(where: { id : "${modal?ctx.targetProduct?.id:slug}", idd:"${param}" }){
        //       name id
        //     }
        //   }` }).then(res=>{
        //       if(res.data.data.exportProducts?.length){
        //         setSelectedData(res.data.data.exportProducts[0]);
        //         if(!modal){
        //             setProductName(res.data.data.exportProducts[0].name);
        //         }
        //       }
        // });
    }

    const clickHandle = () =>{
        if(data.length){
            ctx.loadFunc(true);
            if(fetchID){
                axios.put(`exporttwos/${fetchID}`, { body: data, idd: param, parent: slug, export_product: slug }).then(res=>{
                    ctx.alertFunc('green','Амжилттай',true );
                    ctx.loadFunc(false);
                    history.push(`/${param}/export/2/${slug}`);
                }).catch(err=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }else{
                axios.post(`exporttwos`, { body: data, idd: param, parent: slug, export_product: slug }).then(res=>{
                    axios.put(`totals/${ctx.total?.id}`, { exportone: true, idd: param }).then(res=>{
                        ctx.alertFunc('green','Амжилттай',true );
                        ctx.loadFunc(false);
                        history.push(`/${param}/export/2/${slug}`);
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
        {modal? <ContentParser data={data} titleSm={`Экспортын бүтээгдэхүүний - ${selectedData?.name}`} titleBig={`IV. Экспортын бүтээгдэхүүн, үйлчилгээ`} />
        :<Container>
            <CkEditor data={data} setData={setData} title={`Экспортын бүтээгдэхүүний - ${selectedData?.name}`} />

            <ButtonStyle2 >
                <div className="errTxt">{errTxt&&`Утга оруулна уу`}</div>
                <button onClick={clickHandle}  className="myBtn">Хадгалах</button>
            </ButtonStyle2>
        </Container>}
            
        </>
    )
}

export default ExportOne

