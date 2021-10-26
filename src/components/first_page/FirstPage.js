import React, { useState, useContext, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"
import styled from 'styled-components'
import axios from "global/axiosbase"
import { edpurl } from "global/edpAxios"
import{  ButtonStyle2, InputStyle, MaxDate, Skeleton } from "components/misc/CustomTheme";
import UserContext from "global/UserContext"
// import FileUploads from "components/misc/FileUpload"
import FileUploadFirst from "components/misc/FileUploadFirst"


const FirstPage = ({modal}) => {
    const history = useHistory();
    const param = useParams().id;
    const ctx = useContext(UserContext);
    const [ errTxt, setErrTxt ] = useState({cond: false, text:''});
    const [ getData, setGetData ] = useState({});
    const [ selectLogo, setSelectLogo ] = useState({});
    // const [ SelectedFile, setSelectedFile ] = useState([]);

    useEffect(()=>{
        FetchData();
    },[]);

    const FetchData = async () =>{
        const data = await axios.get(`firstpages?idd=${param}`);
        if(data.data.length){
            setGetData(data.data[0]);
            setSelectLogo({id: data.data[0].logo_id, fileUrl: data.data[0].logo_url, idd:data.data[0].idd, ids:data.data[0].id });
            // setSelectedFile(data.data[0].firstpageimages);
        }
    }

    const ClickHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(".getInp"); let arr = Array.from(inp); let final = {};
        arr.forEach(el=>{
            final[el.name] = el.value;
        });

        if(selectLogo.id){
            ctx.loadFunc(true);

            if(getData.id){
                axios.put(`firstpages/${getData.id}`, {
                    // idd:param, logo_url:  edpurl + selectLogo.fileUrl.replace("public", ""),
                    // logo_id: selectLogo.id,
                    // product_name:ctx.targetProduct?.name,
                    // target_country:ctx.targetCountry?.country,
                    ...final
                  }).then(res=>{

                    // SelectedFile.forEach(el=>{
                    //     if(el.idd){
                    //         axios.put(`firstpageimages/${el.id}`, { firstpage:res.data.id, image_url: el.image_url, image_id: parseInt(el.id), idd: param });
                    //     }else{
                    //         axios.post(`firstpageimages`, { firstpage:res.data.id, image_url: edpurl + el.fileUrl.replace("public", ""), image_id: el.id, idd: param });
                    //     }
                    // });

                    axios.put(`totals/${ctx.total?.id}`, { firstpage: true, idd: param });
                    ctx.alertFunc('green','Амжилттай',true );
                    ctx.loadFunc(false);
                }).catch(_=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }else{
                axios.post(`firstpages`, {
                    idd:param, logo_url:  edpurl + selectLogo.fileUrl.replace("public", ""),
                    logo_id: selectLogo.id,
                    product_name:ctx.targetProduct?.name,
                    target_country:ctx.targetCountry?.country,
                    ...final
                  }).then(res=>{
                    // SelectedFile.forEach(el=>{
                    //     axios.post(`firstpageimages`, { firstpage:res.data.id, image_url: edpurl + el.fileUrl.replace("public", ""), image_id: el.id, idd: param });
                    // })
                    axios.put(`totals/${ctx.total?.id}`, { firstpage: true, idd: param });
                    ctx.alertFunc('green','Амжилттай',true );
                    ctx.loadFunc(false);
                    setTimeout(() => {
                        history.push(`/${param}`)
                    }, 3000)
                }).catch(_=>ctx.alertFunc('orange','Алдаа гарлаа',true ));
            }
        }else{
            setErrTxt({ cond:true, text: "Зурагаа хавсаргана уу" });
            setTimeout(() => {
                setErrTxt({ cond:false, text: "Зурагаа хавсаргана уу" });
            }, 4000)
        }

        
    }

    return (
        <Container className="container">
            <form onSubmit={ClickHandle}>
                <div className={modal?`contentA4 A2`:`contentA4`}>
                    {/* <div className="LogoPar">
                        <img src="https://idreamleaguesoccerkits.com/wp-content/uploads/2018/03/Korea-Republic-Logo-512x512-URL-300x300.png" />
                    </div> */}
                   {modal?selectLogo.fileUrl?<FileUploadFirst selectLogo={selectLogo} setSelectLogo={setSelectLogo} />
                   :<Skeleton><div className="item" ><div className="child" /></div> </Skeleton>
                   :<FileUploadFirst selectLogo={selectLogo} setSelectLogo={setSelectLogo} />}

                    <div className="firstPageInp">
                        <div className="title">Аж ахуйн нэгжийн нэр: {modal&&getData.comp_name}</div>
                        {!modal&&<InputStyle className="inpt">
                            <input type="text" defaultValue={getData.comp_name?getData.comp_name:``} className="getInp" name="comp_name" required />
                        </InputStyle>}
                    </div>

                    <div className="item">Экспортын бүтээгдэхүүн, үйлчилгээний нэр: {ctx.targetProduct?.name}</div>
                    {/* <div className="item">Экспортын бүтээгдэхүүн, үйлчилгээний HS код: 160250</div> */}

                    <div className="firstPageInp">
                        <div className="title">Экспортын бүтээгдэхүүн, үйлчилгээний HS код: {modal&&getData.product_code} </div>
                        {!modal&&<InputStyle className="inpt">
                            <input type="number" defaultValue={getData.product_code?getData.product_code:``} className="getInp" name="product_code" required />
                        </InputStyle>}
                    </div>

                    {/* <div className="itemTitle" style={!selectLogo.id?{marginBottom:45}:{marginBottom:0}} >Экспортын бүтээгдэхүүний зураг</div>
                    { selectLogo.id?<FileUploads SelectedFile={SelectedFile} setSelectedFile={setSelectedFile} title={``} first={true} modal={modal} />
                    :getData.id? <FileUploads SelectedFile={SelectedFile} setSelectedFile={setSelectedFile} title={``} modal={modal} first={true} /> : null } */}
                    
                    
                    <div className="item">Экспортын зорилтот орны нэр: {ctx.targetCountry?.country}</div>

                    {/* <div className="item date">Огноо: 2021/04/20</div> */}

                    <div className="firstPageInp A12">
                        <div className="title">Огноо: {modal&&getData.date} </div>
                        {!modal&&<InputStyle className="inpt">
                            <input className="getInp" defaultValue={getData.date?getData.date:``} name="date" max={MaxDate} type="text" onFocus={(e) => e.target.type = 'date'} required />
                        </InputStyle>}
                    </div>
                </div>

                {!modal&&<ButtonStyle2>
                    <div className="errTxt">{errTxt.cond&&`${errTxt.text}`}</div>
                    <button type="submit" className="myBtn">Хадгалах</button>
                </ButtonStyle2>}
            </form>
            

        </Container>
    )
}

export default FirstPage

const Container = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:30px 0px;
    margin-bottom:50px;
    .contentA4{
        box-shadow:1px 1px 20px -10px;
        margin-top:30px;
        padding:17mm;
        width:794px;
        height:1123px;
        text-align:center;
        background-color:#fff;
        .firstPageInp{
            display:flex;
            justify-content:center;
            align-items:center;
            gap:18px;
            margin-bottom:45px;
            .inpt{
                font-size:14px;
                width:30%;
                margin-bottom:0px;
            }
        }
        .A12{
            margin-top:180px;
        }
        .LogoPar{
            margin-bottom:45px;
            img{
                width:130px;
                height:auto;
            }
        }
        .item{
            margin-bottom:45px;
        }
        .date{
            margin-top:250px;
        }
    }
    .A2{
        margin-bottom:0px;
        // margin-bottom:100px;
        font-size:16px;
        box-shadow:none;
        .A12{
            margin-top:200px;
        }
        .item{
            margin-bottom:70px;
        }
        .inputSector{
            display:none;
        }
    }
    @media print{
        page-break-inside: avoid;
        margin-bottom:200px;
        .A2{
            margin-bottom:100px;
            font-size:16px;
            box-shadow:none;
            .inputSector{
                display:none;
            }
            .A12{
                margin-top:170px;
            }
            .firstPageInp{
                .title{
                    font-size:21px !important;
                }
            }
            .itemTitle{
                font-size:21px !important;
            }
            .item{
                font-size:21px !important;
                margin-bottom:70px;
            }
            .LogoPar{
                margin-bottom:45px;
                img{
                    width:300px !important;
                    height:auto;
                }
            }
        }
        .contentA4{
            .LogoPar{
                margin-bottom:45px;
                img{
                    width:3000px !important;
                    height:auto;
                }
            }
        }
    }
`