import styled, { keyframes } from 'styled-components'

export const ButtonStyle = styled.button`
    border-radius:5px;
    padding:8px 40px;
    background-color:#0A6599;
    border-style:none;
    color:white;
    font-weight:500;
    transition:all 0.2s ease;
    outline: none !important;
    img{
        width:20px;
    }
    &:hover{
        background-color:rgba(0, 51, 102,0.9);
        box-shadow:1px 1px 6px -2px black;
        outline: none;
    }
`
const animeSkeleton = keyframes`
    0%{ left:-100%; }
    100%{ left:100% }
`

export const Skeleton = styled.div`
    margin:10px 0px 30px 0px; 
    display:flex;
    align-items:center;
    justify-content:center;
    gap:18px;
    .item{
        overflow: hidden;
        height:150px;
        width:150px;
        box-shadow:1px 1px 8px -4px;
        border-radius:6px;
        position:relative;
        .child{
            position:absolute;
            top:0;
            width:50%;
            height:100%;
            background-image: linear-gradient(to right, rgba(60,60,60,0), rgba(120,120,120,0.2), rgba(60,60,60,0));
            animation: ${animeSkeleton} 0.8s linear infinite;
        }
    }
`

export const ButtonStyle2 = styled.div`
        padding:30px 0px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        .errTxt{
            transition:all 0.4s ease;
            text-align:center;
            background-color: #f6c343;
            border-radius:5px;
            font-size:15px !important;
            font-weight:400;
            color:black !important;
            line-height:34px;
            padding:0px 20px;
        }
        .myBtn{
            border-radius:5px;
            padding:8px 40px;
            // background-color:#0A6599;
            background-color:#337ab7;
            border-style:none;
            color:white;
            font-weight:500;
            transition:all 0.2s ease;
            outline: none !important;
            
            img{
                width:20px;
            }
            &:hover{
                background-color:rgba(0, 51, 102,0.9);
                box-shadow:1px 1px 6px -2px black;
                outline: none;
            }
            &[disabled]{
                opacity:0.7;
                &:hover{
                    box-shadow:1px 1px 10px -2px white;
                    background-color:#0A6599;
                }
            }
        }
`

export const SmHead =({num, title, backColor})=>{
    return (
    <SmTitle className="headPar">
        <div style={{backgroundColor:backColor}} className="svgPar">
            <div  className="num">{num}</div>
        </div>
        <span style={{backgroundColor:backColor}}>{title}</span>
    </SmTitle>
    )
}

const SmTitle = styled.div`
    display:flex;
    align-items:center;
    padding:15px 0px;
    .svgPar{
        display:flex;
        align-items:center;
        justify-content:center;
        width:40px;
        height:40px;
        border-radius:50%;
        border:1px solid white;
        .num{
            font-weight:600;
            font-size:15px;
        }
        svg{
            color:black;
            font-size:24px;
        }
        z-index:1;
    }
    span{
        padding:5px 0px;
        padding-left:25px;
        padding-right:50px;
        margin-left:-5px;
        border-radius:0px 6px 6px 0px;
        color:rgb(0, 18, 41);
        font-weight:500;
        font-size:12.8px;
    }
`

export const InputStyle = styled.div`
        transition:all 0.3s ease;
        position:relative;
        display:flex;
        flex-direction:column;
        align-items:start;
        justify-content:space-between;
        overflow:hidden;
        width:100%;
        margin-bottom:18px;
        .label{
            opacity:0.9;
            margin-bottom:8px;
        }
        input{
            box-shadow:1px 1px 13px -8px #21659f;
            border-radius: 4px;
            align-self:flex-end;
            width:100%;
            border:1px solid rgba(0,0,0,0.2);
            padding:7px 0px;
            padding-left:5px;
            transition:all 0.3s ease;
            &:hover{
                border:1px solid rgba(33, 101, 159, 0.4);
            }
            &:focus{
                border:1px solid #21659f;
                outline-width: 0;
            }
        }
        .RedPar{
            border-bottom:1px solid red;
        }
        select{
            font-weight:500;
            color:rgba(0,0,0,0.75);
            font-size:12px;
            transition:all 0.3s ease;
            -webkit-appearance: none;
            -moz-appearance: none;
            -ms-appearance: none;
            appearance: none;
            width:100%;
            border-radius: 4px;
            align-self:flex-end;
            border:1px solid rgba(0,0,0,0.2);
            padding:7px 0px;
            padding-left:5px;
            transition:all 0.3s ease;
            option[value=""][disabled] {
                display: none;
            }
            option {
                color:rgba(0,0,0,0.8);;
            }
            &:hover{
                border:1px solid rgba(33, 101, 159, 0.4);
            }
            &:focus{ 
                border:1px solid #21659f;
                outline-width: 0;
            }
            &:focus ~ .SelectArr{ 
                // background-color:rgba(0,0,0,0.1);
                svg{
                    transform: rotate(90deg);
                }
            }
            &::-ms-expand{
                display: none;
            }
            & > option[value=""][disabled] {
                color: red;
            }
        }
        .SelectArr{
            transition:all 0.3s ease;
            position:absolute;
            top:2%;
            right:0.5%;
            background-color:white;
            height:95%;
            width:24px;
            display:flex;
            align-items:center;
            justify-content:center;
            border-radius:2px;
            z-index:1;
            svg{
                transition:all 0.3s ease;
                font-size:18px;
                color:rgba(0,0,0,0.8);
            }
        }
        
        textarea{
            border-radius: 4px;
            align-self:flex-end;
            width:100%;
            border:1px solid rgba(0,0,0,0.2);
            // padding:5px 5px;
            padding-bottom:5px;
            padding-left:5px;
            transition:all 0.3s ease;
            &:hover{
                border:1px solid rgba(33, 101, 159, 0.3);
            }
            &:focus{ 
                outline-width: 0;
                border:1px solid #21659f;
            }
        }
        .red{
            border:1px solid rgba(255,0,0,0.8);
        }

        .cash{
            padding-right:10px;
            text-align:right;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
            background: transparent;
            bottom: 0;
            color: transparent;
            cursor: pointer;
            height: auto;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            width: auto;
        }

`

export const HeaderTwo = styled.div`
    font-size:13px;
    margin-top:30px;
    margin-bottom:100px;
    .smMenuPar{
        display:flex;
        .itemsPar{
            text-decoration:none;
            border-style:none;
            font-weight:500;
            cursor:pointer;
            // background-color:#77B5C6;
            // background-color:rgba(0,0,0,0.05);
            // background-color:#f0f2f5;
            background-color:#e4e6eb;
            margin-right:5px;
            padding:10px 24px;
            border-radius: 5px 5px 0px 0px;
            outline: none;
            color: rgba(${props=>props.theme.textColor},0.6);
        }
        .itemsPar2{
            border-style:none;
            color: rgba(${props=>props.theme.textColor},1);
            // border-top:1px solid rgba(0,0,0,0.2);
            // border-right:1px solid rgba(0,0,0,0.2);
            // border-left:1px solid rgba(0,0,0,0.2);
            background-color:#fff;
            outline: none;
            box-shadow:-4px -5px 13px -11px black;
        }
        .Active{
            border-top:2px solid green;
            position:relative;
                // &::before{
                //     content:"✔";
                //     position:absolute;
                //     display:flex;
                //     align-items:center;
                //     justify-content:center;
                //     z-index:1;
                //     top:-10px;
                //     left:5%;
                //     border:1px solid green;
                //     background-color:white;
                //     color:green;
                //     width:17px;
                //     height:17px;
                //     border-radius:50%;
                // }
        }
        .dd{
            margin-left:0px;
            border-left:1px solid rgba(0,0,0,0);
        }
    }
    @media only screen and (max-width:768px){
        .smMenuPar{
            flex-direction:column;
        }
    }
`
const bigAnimation = keyframes`
    0% { opacity:0; transform:translateY(-12px); }
    100% { opacity:1; transform:translateY(0px); }
`

const rowAnimation = keyframes`
    0% { opacity:0; transform:translateY(-12px); }
    100% { opacity:1; transform:translateY(0px); }
`


export const Container = styled.div`
    page-break-inside: avoid;
    animation: ${bigAnimation} 0.6s ease;
    width:100%;
    background-color: ${props=>props.theme.Color2};
    padding:40px 100px;
    font-size:${props=>props.theme.fontSize};
    border-radius:0px 5px 5px 5px;
    box-shadow: -5px 5px 12px -12px black;
    @media only screen and (max-width:768px){
        padding:40px 15px;
    }
    @media only screen and (max-width:1400px){
        padding:30px 60px;
    }
    .customTable{
        width:91.4%;
        margin-top:20px;
        .headPar{
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-bottom:8px;
            .title{
                font-size:14px;
            }
            .addBtn{
                cursor:pointer;
                padding:5px 10px;
                background-color: #fff;
                border-color: rgba(0,0,0,0.3);
                color: #333;
                border-radius: 4px;
                border-width: 1px;
                border-style: solid;
                display:flex;
                align-items:center;
                svg{
                    margin-right:3px;
                    font-size:20px;
                }
                &:hover{
                    background-color:#ddd;
                }
            }
        }
        
        table{
            width:100%;
            border-collapse: collapse;
            th{
                background-color:#E7E9EB;
            }
            td, th{
                &:first-child{
                    text-align:center;
                }
                padding:5px 7px;
                border:1px solid rgba(0,0,0,.3);
            }
            td{
                animation: ${rowAnimation} 0.5s ease;
                &:last-child{
                    padding:8px 0px;
                }
            }
            .right{
                text-align:right;
            }
            .center{
                text-align:center;
                th{
                    text-align:center;
                }
            }
            .ghost{
                opacity:0.5;
                border:1px solid rgba(0,0,0,0.056);
                td{
                    border:1px solid rgba(0,0,0,0.16);
                }
            }
            .cusorItems{
                transition:all 0.2s ease;
                cursor:pointer;
                &:hover{
                    background-color:#eaecf1;
                }
            }
            .Selected{
                position:relative;
                transition:all 0.2s ease;
                background-color:#d8dce6;
                &:after{
                    content:"✔";
                    position:absolute;
                    color:green;
                    width:22px;
                    height:22px;
                    top:14px;
                    left:-14px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:14px;
                    border-radius:50%;
                    // border:1px solid red;
                    background:#fff;
                    box-shadow:0px 0px 10px -6px;
                }
            }
            .editDeletePar{
                padding:0px 8px;
                display: flex;
                justify-content:space-evenly;
                align-items:center;
                .smBtn{
                    cursor:pointer;
                    padding:5px;
                    background-color: #fff;
                    border-color: #ddd;
                    color: #333;
                    border-radius: 4px;
                    border-width: 1px;
                    border-style: solid;
                    display:flex;
                    align-items:center;
                    svg{
                        font-size:16px;
                    }
                    &:hover{
                        background-color:#ddd;
                    }
                }
            }
        }
    }
    .T3{
        width:100%;
    }
    .T2{
        margin-bottom:45px;
        th{
            font-weight:400;
        }
        .parent{
            font-weight:500;
        }
        .child{
            color: rgba(0, 18, 41, 0.8);
            .title{
               text-align:center;
            }
        }
    }
    .pageRender{
       page-break-inside: avoid;
       margin-bottom:30px;
        width:100%;
        .bigTitle{
            font-size:20px;
            margin-bottom:10px;
            text-align:center;
        }
        .headPar{
            justify-content:center;
            .title{
                margin-bottom:5px;
                font-size:16px;
                color:rgb(60,60,60);
            }
            .addBtn{
                display:none;
            } 
        }
        table{
            th, td{
                &:last-child{
                    display:none;
                }
                padding:10px;
            }
            .showing{
                display:table-cell !important;
            }
        }
        @media print{
            table{
                th{
                    font-weight:400 !important;
                }
                font-size:15px !important;
            }
        }
    }
    .LastRotate{
        // margin-top:1200px;
        page-break-inside: avoid;
        // transform:rotate(-90deg);
        // transform-origin: top left;
    }
`
const ModalAnimate = keyframes`
    0%{ opacity:0; transform:scale(0); }
    100%{ opacity:1; transform:scale(1); }
`
const ModalAnimate2 = keyframes`
    0%{ opacity:1; transform:scale(1); }
    100%{ opacity:0; transform:scale(0); }
`
export const CustomModal = styled.div`
    z-index:1000;
    position:fixed;
    width:100%;
    height:100%;
    left:0;
    top:0;
    transform: translate(0px, 0px);
    // background-color: rgba(255,255,255,.8);
    background-color: rgba(0,0,0,.6);
    display:flex;
    align-items:start;
    justify-content:center;
    padding-top:6rem;
    overflow-y:scroll;
    .contentParent{
        animation:${ModalAnimate} 0.4s ease;
        border-radius:6px;
        background-color:white;
        border:1px solid rgba(0,0,0,0.1);
        box-shadow:1px 1px 18px -10px;
        .head{
            color:#333333;
            padding:10px 20px;
            display:flex;
            align-items:center;
            justify-content:space-between;
            font-size:20px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            margin-bottom:10px;
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
                padding:5px;
                &:hover{
                    background-color: rgba(0,0,0,.055);
                }
            }
        }
        .content{
            padding:10px 40px;
            .modalbtnPar{
                display:flex;
                justify-content:flex-end;
                padding:11px 0px;
                .modalbtn{
                    font-weight:500;
                    cursor:pointer;
                    padding:5px 12px;
                    background-color: #fff;
                    border-color: rgba(0,0,0,0.3);
                    color: #333;
                    border-radius: 4px;
                    border-width: 1px;
                    border-style: solid;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    gap:12px;
                    width:20%;
                    &:hover{
                        background-color:#ddd;
                    }
                    svg{
                        font-size:18px;
                    }
                }
            }
            .modalbtnParActive{
                position:relative;
                &::before{
                    content:"✔";
                    position:absolute;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    z-index:1;
                    top:-2px;
                    right:2%;
                    border:1px solid green;
                    background-color:white;
                    color:green;
                    width:19px;
                    height:19px;
                    border-radius:50%;
                }
            }
            .TableHead{
                display:flex;
                justify-content:space-between;
                align-items:center;
                padding-left:30px;
                margin-bottom:15px;
                &:first-child{
                    padding-left:0px;
                    margin-bottom:30px;
                    border-bottom:1px solid rgba(0,0,0,0.1);
                }
                
                .title{
                    width:20%;
                    font-weight:500;
                }
                .inputt{
                    width:22%;
                }
            }
        }
    }
    .contentParent2{
        animation:${ModalAnimate2} 0.4s ease;
    }
    
`

export const CustomFileUpload = styled.div`
    margin-top:10px;
    padding:15px 0px;
    .title{
        font-size:14px;
        font-weight:500;
        padding-bottom:8px;
        margin-bottom:8px;
        border-bottom:1px solid rgba(0,0,0,0.2);
    }
    .contentPar{
        padding:10px 0px;
        display:flex;
        align-items:center;
        justify-content:start;
        gap:15px;
        flex-wrap: wrap;
        .imgPar{
            overflow:hidden;
            position:relative;
            border-radius:5px;
            box-shadow:1px 1px 10px -4px;
            width:90px;
            height:90px;
            &:hover{
                .Addition{
                    top:0px;
                }
            }
            .Addition{
                transition:all 0.3s ease;
                position:absolute;
                top:-100%;
                left:0;
                width:100%;
                height:100%;
                z-index:3;
                background-color:rgba(0,0,0,0.5);
                display:flex;
                align-items:center;
                justify-content:center;
                gap:15px;
                svg{
                    padding:2px;
                    transition:all 0.1s ease;
                    border-radius:8px;
                    font-size:30px;
                    color:#fff;
                }
                .delete{
                    &:hover{
                        background-color:#fff;
                        color:black;
                    }
                    cursor:pointer;
                }
                .see{
                    &:hover{
                        background-color:#fff;
                        color:black;
                    }
                    cursor:pointer;
                }
            }
            img{
                cursor:pointer;
                top:0;
                left:0;
                position:absolute;
                width:100%;
                height:100%;
                object-fit:cover;
            }
        }
        .imgPar2{
            width:150px;
            height:100%;
            box-shadow:none;
            .Addition{
                top:-100%;
            }
            .img{
                position:relative;
                width:100%;
                height:auto;
                object-fit:contain;
            }
        }
        
        .inputSector{
            .inputStyle{
                transition:all 0.3s ease;
                margin-bottom:0px;
                cursor:pointer;
                padding:10px;
                height:90px;
                width:90px;
                display:flex;
                border:2px solid rgba(${props=>props.theme.textColor},0.4);
                border-style:dashed;
                svg{
                    transition:all 0.3s ease;
                    height:100%;
                    width:100%;
                    color:rgba(${props=>props.theme.textColor},0.4);
                    // font-size:24px;
                }
                &:hover{
                    border:2px solid rgba(${props=>props.theme.textColor});
                    border-style:dashed;
                    svg{
                        color:rgba(${props=>props.theme.textColor});
                    }
                }
            }

            input[type="file"]{
                display:none;
            }
        }
    }
    .contentPar2{
        margin-bottom:30px;
        align-items:start;
        justify-content:center;
    }
    contentPar3{
        align-items:start;
        justify-content:start;
    }

    @media print{
        margin-bottom:30px;
        .contentPar{
            .imgPar{
                overflow:visible;
                position:relative;
                width:unset;
                height:unset;
                .Addition{
                    display:none;
                }
                img{
                    position:unset;
                    width:185px;
                    height:auto;
                    object-fit:contain;
                }
            }
            .imgPar2{
                width:300px;
                height:100%;
                box-shadow:none;
                .Addition{
                    top:-100%;
                }
                .img{
                    position:relative;
                    width:100%;
                    height:auto;
                    object-fit:contain;
                }
            }
        }
        
    }
`



const today = new Date(); const month = (today.getMonth()+1); const day = today.getDate();
const Currentdate = today.getFullYear() + '-' + (month.toString().length ===1?'0'+month : month) + '-' + (day.toString().length ===1?'0'+day : day);
export const MaxDate = Currentdate
