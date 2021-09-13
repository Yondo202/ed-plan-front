import React, { useRef, useState, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import UserContext from "global/UserContext"
import { GrDocumentPdf } from "react-icons/gr"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useReactToPrint } from "react-to-print";
import InfoProject from "components/intro/ProjectIntro"
import Infohistory from "components/intro/Infohistory"
import InfoOne from "components/intro/InfoOne";
import InfoTwo from "components/intro/infoTwo";
import InfoThree from "components/intro/InfoThree";
import BusinessInfoDesc from "components/business_info/businessInfoDesc";
import BusinessOneMain from "components/business_info/busOneMain";
import BusinessTwoMain from "components/business_info/busTwoMain";
import ExportOne from "components/export/ExportOne"
import ExportTwo from "components/export/ExportTwo"
import ExportThree from "components/export/ExportThree"
import AnalysisOne from "components/analysis/one/AnalysisMain"
import AnalysisTwo from "components/analysis/two/AnalysisMain"
import AnalysisThree from "components/analysis/Analysisthree"
import AnalysisFour from "components/analysis/AnalysisFour"
import AnalysisFive from "components/analysis/five/AnalysisFiveMain"
import MarketingMain from "core/contents/marketing"
import FinancePlan from "components/plan_report/FinancePlan"
import FirstPage from "components/first_page/FirstPage"
import BuyPlan from "components/plan_report/BuyPlan"
// import TotalReport from "components/plan_report/TotalReport"

 const ModalMain = ({setShowModal, admin}) => {
    const ctx = useContext(UserContext)
    const [ cssName, setCssName ] = useState('');
    const modalRef = useRef(null);
    const componentRef = useRef();

    const CloseHandle = e =>{
        if(admin===false){
            if(modalRef.current === e.target){
                setCssName('A1');
                setTimeout(() => {
                    setShowModal(false);
                }, 300);
            }
        }
    }

    const CloseHandle2 =_=>{
        setCssName('A1');
        setTimeout(() => {
            setShowModal(false);
        }, 300);
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const ttl = ctx.total

    return (
        <ModalStyle ref={modalRef} onClick={CloseHandle} admin={admin}>
            <div className={`Content ${cssName}`}>
                <div className="header">
                    {admin===true&&<div className="addBtn" onClick={()=>window.history.back()}><AiOutlineArrowLeft /> <span>Буцах</span></div>}
                    <div className="addBtn" onClick={handlePrint}><GrDocumentPdf /> <span> Хэвлэх болон pdf - татах</span></div>
                    {admin===false?<div onClick={CloseHandle2} className="close">✖</div>:<h6 style={{marginBottom:0}}>Экспорт хөгжлийн төлөвлөгөө</h6>}
                </div>
                <div ref={componentRef}>
                    {/* <FirstPage modal={true} /> */}
                    {ttl?.firstpage&&<FirstPage modal={true} />}
                    {ttl?.projectinfo&&<InfoProject modal={true} />}
                    {ttl?.infohistory&&<Infohistory modal={true} />}
                    {ttl?.infoone&&<InfoOne modal={true} />}
                    {ttl?.infotwo&&<InfoTwo modal={true} />}
                    {ttl?.infothree&&<InfoThree modal={true} />}
                    {ttl?.businessone&&<BusinessInfoDesc modal={true} />}
                    {ttl?.busone&&<BusinessOneMain modal={true} />}
                    {ttl?.bustwo&&<BusinessTwoMain modal={true}/>}
                    {ttl?.exportone&&<ExportOne modal={true}/>}
                    {ttl?.exporttwo&&<ExportTwo modal={true} />}
                    {ttl?.exporttwo&&<ExportThree modal={true} />}
                    {ttl?.analysisone&&<AnalysisOne modal={true} />}
                    {ttl?.analysistwo&&<AnalysisTwo modal={true} />}
                    {ttl?.analysisthree&&<AnalysisThree modal={true} />}
                    {ttl?.analysisfour&&<AnalysisFour modal={true} />}
                    {ttl?.analysisfive&&<AnalysisFive modal={true} />}
                    {ttl?.m_one&&<MarketingMain modal={true} />}
                    {ttl?.financeplan&&<FinancePlan modal={true} />}
                    {ttl?.buy_plan&&<BuyPlan modal={true} />}

                    {/* <TotalReport modal={true} /> */}
                </div>
            </div>
        </ModalStyle>
    )
}
export default ModalMain
const animation = keyframes`
    0% { transform:translateX(-300px); }
    100% { transform:translateX(0px); }
`

const ModalStyle = styled.div`
    position:fixed;
    background-color:rgba(0,0,0,.5);
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:1000;
    display:flex;
    justify-content:${props=>props.admin?`center`:`start`} ;
    .A1{
        transition:all 0.3s ease;
        opacity:0;
        transform:translateX(-300px);
    }
    .Content{
        box-shadow:none !important;
        width:${props=>props.admin?`1000px`:`854px`};
        overflow-y:scroll;
        transition:all 0.4s ease;
        animation: ${animation} 0.4s ease;
        // width:40%;
        height:100vh;
        background-color:#fff;
        padding: ${props=>props.admin?`0px 93px`:`0px 20px`};
        .header{
            position:sticky;
            top:0;
            z-index:3;
            background-color:#fff;
            margin-bottom:10px;
            padding:15px 0px 15px 0px;
            display:flex;
            text-align:center;
            justify-content:space-between;
            border-bottom:1px solid rgba(0,0,0,0.1);
            .addBtn{
                cursor:pointer;
                padding:5px 40px;
                background-color: #fff;
                border-color: #ddd;
                color: #333;
                border-radius: 4px;
                border-width: 1px;
                border-style: solid;
                display:flex;
                align-items:center;
                span{
                    font-weight:500;
                    font-size:14px;
                }
                svg{
                    margin-right:15px;
                    font-size:18px;
                }
                &:hover{
                    background-color:#ddd;
                }
            }
            .close{
                transition:all 0.15s ease;
                border-radius:3px;
                width:30px;
                height:30px;
                display:flex;
                align-items:center;
                justify-content:center;
                background-color: rgba(0,0,0,.0);
                cursor:pointer;
                padding:8px;
                &:hover{
                    background-color: rgba(0,0,0,.055);
                }
            }
        }
    }
    @page {
        size: A4;
        margin: 17mm 17mm 17mm 17mm;
    }
`

