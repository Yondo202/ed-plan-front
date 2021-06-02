import React, { useEffect, useState } from 'react'
import axios from "global/axiosbase"
const UserContext = React.createContext();

export const UserStore = (props) => {
    const [ cond, setCond ] = useState(false);
    const [ userId, setUserID ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ alert, setAlert ] = useState({ color: 'white', text: '', cond: false });
    const [ total, setTotal ] = useState({});
    const [ approve, setApprove ] = useState({});
    const [ productId, setProductId ] = useState(null);
    const [ targetProduct, setTargetProduct ] = useState({});
    const [ targetCountry, setTargetCountry ] = useState({});

    useEffect(()=>{
        const FetchTotal = async () =>{
            await axios.get(`totals?idd=${userId}`).then(res=>{
                 setTotal(res?.data[0]);
             });
         }
        if(userId){
            FetchTotal();
        }
    },[userId, alert]);

    useEffect(()=>{
        const FetchApprove = async () =>{
            await axios.get(`approves?idd=${userId}`).then(res=>{
                 setApprove(res?.data[0]);
             });
         }
        if(userId){
            FetchApprove();
        }
    },[userId]);

    useEffect(()=>{
        fetchProductId();
        fetchTargetCountry();
    },[cond, userId]);

    const fetchTargetCountry = async () =>{
        await axios.get(`analysistwos?idd=${userId}&target=true`).then(res=>{
           if(res.data.length){
              setTargetCountry(res.data[0]);
           }
        });
    }

    const fetchProductId = () =>{
        axios.post(`graphql`, { query: `query{
            exportProducts(where: { idd: "${userId}" , selected :true }){
              name id
            }
          }` }).then(res=>{
              if(res.data.data.exportProducts.length){
                setProductId(res.data.data.exportProducts[0].id);
                setTargetProduct(res.data.data.exportProducts[0]);
              }
          })
    }

    const UserIdProvider = (id) =>{
        setUserID(id);
    }

    const loadFunc = (cond) =>{
        setLoading(cond);
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }
    const alertFunc = (color, text, cond)=>{
        setAlert({ color: color, text: text, cond: cond });
        setTimeout(() => { setAlert({ color: 'white', text: '', cond: false }); }, 4000);
    }

    return (
        <UserContext.Provider value={{ UserIdProvider, userId, loading, loadFunc, alert, alertFunc, total, approve, productId, setCond, setApprove, targetCountry, targetProduct }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;
