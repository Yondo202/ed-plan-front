import React from 'react'
import { Parser } from "html-to-react";
import styled from 'styled-components';
const parser = new Parser();

const ContentParser = ({data, titleSm, titleBig}) => {

    return (
        <PrintStyle>
            {titleBig===''?null:<div className="BigTitle">{titleBig}</div>}
            {titleSm===''?null:<div className="titleSm">{titleSm}</div>}
            <div className="ContentSector">{parser.parse(data)}</div>
        </PrintStyle>
    )
}

export default ContentParser

const PrintStyle = styled.div`
    page-break-inside: avoid;
    margin-bottom:35px;
    .ContentSector{
        table{
            td, th{
                border:1px solid rgba(0,0,0,.2);
            }
        }
        text-align: justify;
        font-size:13px;
    }
    .BigTitle{
        text-align:center;
        font-size:18px;
        margin-bottom:10px;
    }
    .titleSm{
        margin-bottom:5px;
        text-align:center;
        font-size:16px;
        color:rgb(60,60,60);
    }
    @media print{
        .BigTitle{
            font-size:24px;
        }
        .ContentSector{
            font-size:17px;
        }
        .titleSm{
            font-size:21px;
        }

    }
`