import React from 'react'
import { Parser } from "html-to-react";
import styled from 'styled-components';
const parser = new Parser();

const ContentParser2 = ({data, titleSm, titleBig}) => {

    return (
        <PrintStyle>
            {titleBig===''?null:<div className="BigTitle">{titleBig}</div>}
            {titleSm===''?null:<div className="titleSm">{titleSm}</div>}
            <div className="ContentSector">{parser.parse(data)}</div>
        </PrintStyle>
    )
}

export default ContentParser2

const PrintStyle = styled.div`
    margin-bottom:30px;
    .ContentSector{
        text-align: justify;
        font-size:13px;
    }
    .BigTitle{
        text-align:center;
        font-size:20px;
        margin-bottom:10px;
    }
    .titleSm{
        margin-bottom:5px;
        text-align:center;
        font-size:16px;
        color:rgb(60,60,60);
    }
    @page{
        .ContentSector{
            font-size:12px;
        }
        .titleSm{
            font-size:14px;
        }

    }
`