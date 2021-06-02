import React, { useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { GrDocumentPdf } from "react-icons/gr"
import { useReactToPrint } from "react-to-print";
import InfoProject from "components/intro/ProjectIntro"
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
// import TotalReport from "components/plan_report/TotalReport"

 const ModalMain = ({setShowModal}) => {
    const [ cssName, setCssName ] = useState('');
    const modalRef = useRef(null);
    const componentRef = useRef();

    const CloseHandle = e =>{
        if(modalRef.current === e.target){
            setCssName('A1');
            setTimeout(() => {
                setShowModal(false);
            }, 300)
        }
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <ModalStyle ref={modalRef} onClick={CloseHandle}>
            <div className={`Content ${cssName}`}>
                <div className="header">
                    <div className="addBtn" onClick={handlePrint}><GrDocumentPdf /> <span> Хэвлэх болон pdf - татах</span></div>
                    <div className="close">✖</div>
                </div>

                <div ref={componentRef}>
                    <InfoProject modal={true} />
                    <InfoOne modal={true} />
                    <InfoTwo modal={true} />
                    <InfoThree modal={true} />
                    <BusinessInfoDesc modal={true} />
                    <BusinessOneMain modal={true} />
                    <BusinessTwoMain modal={true}/>
                    <ExportOne modal={true}/>
                    <ExportTwo modal={true} />
                    <ExportThree modal={true} />
                    <AnalysisOne modal={true} />
                    <AnalysisTwo modal={true} />
                    <AnalysisThree modal={true} />
                    <AnalysisFour modal={true} />
                    <AnalysisFive modal={true} />
                    <MarketingMain modal={true} />
                    <FinancePlan modal={true} />

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
    .A1{
        transition:all 0.3s ease;
        opacity:0;
        transform:translateX(-300px);
    }
    .Content{
        width:854px;
        overflow-y:scroll;
        transition:all 0.4s ease;
        animation: ${animation} 0.4s ease;
        // width:40%;
        height:100vh;
        background-color:#fff;
        padding:0px 20px;
        .header{
            position:sticky;
            top:0;
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

