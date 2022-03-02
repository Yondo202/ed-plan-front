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
        const FetchTotal = () =>{
             axios.get(`totals?idd=${userId}`).then(res=>{
                 console.log(`res`, res)
                 setTotal(res?.data[0]);
             });
         }
        if(userId){
            FetchTotal();
        }
    },[userId, alert]);

    useEffect(()=>{
        const FetchApprove = () =>{
            
             axios.get(`approves?idd=${userId}`).then(res=>{

                 console.log(`res`, res)

                 setApprove(res?.data[0]);
             }).catch(err=>{
                 console.log(`err`, err)
             })
         }
        if(userId){
            console.log("------ hello")
            FetchApprove();
        }
    },[userId]);

    useEffect(()=>{
        fetchProductId(userId);
        fetchTargetCountry();
    },[cond, userId]);

    const fetchTargetCountry = () =>{
         axios.get(`analysistwos?idd=${userId}&target=true`).then(res=>{
           if(res.data.length){
              setTargetCountry(res.data[0]);
           }
        });
    }


    const fetchProductId = (elem) =>{
        axios.get(`export-products?idd=${elem}&selected=true`).then(res=>{
            if(res.data.length){
                setProductId(res.data[0].id);
                setTargetProduct(res.data[0]);
            }
        })
        // axiosGraphql.post(`graphql`, { query: `query{
        //     exportProducts(where: { idd: "${userId}", selected: true }){
        //       name id
        //     }
        //   }` }).then(res=>{
        //       if(res.data.data.exportProducts?.length){
        //         setProductId(res.data.data.exportProducts[0].id);
        //         setTargetProduct(res.data.data.exportProducts[0]);
        //       }
        //   })
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

    console.log(`userId`, userId)

    console.log(`approve`, approve)

    return (
        <UserContext.Provider value={{ UserIdProvider, userId, loading, loadFunc, alert, alertFunc, total, approve, productId, setCond, setApprove, targetCountry, targetProduct, fetchProductId }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;
