import React, { useEffect, useState, useContext } from 'react'
import CkEditor from "components/misc/CkEditor"
import{ Container, ButtonStyle2 } from "components/misc/CustomTheme";
import { useHistory } from "react-router-dom"
import UserContext from "global/UserContext"
import { useParams } from "react-router-dom"
import axios from "global/axiosbase"

const ExportOne = ({setProductName}) => {
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
        axios.get(`exporttwos?parent=${slug}&idd=${param}`, ).then(res=>{
            if(res.data.length){
                setData(res.data[0]);
                setFetchID(res.data[0]?.id);
            }
        })

        
    }

    const FetchProductsOne = async () =>{
        axios.post(`graphql`, { query: `query{
            exportProducts(where: { id : "${slug}", idd:"${param}" }){
              name id
            }
          }` }).then(res=>{
              if(res.data.data.exportProducts.length){
                setSelectedData(res.data.data.exportProducts[0]);
                setProductName(res.data.data.exportProducts[0].name);
              }
        });
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
        }
    }

    return (
        <Container>
            <CkEditor data={data?.body} setData={setData} title={`Экспортын бүтээгдэхүүний - ${selectedData?.name}`} />

            <ButtonStyle2 >
                 <div className="errTxt">{errTxt&&`Утга оруулна уу`}</div>
                <button onClick={clickHandle}  className="myBtn">Хадгалах</button>
            </ButtonStyle2>
        </Container>
    )
}

export default ExportOne

