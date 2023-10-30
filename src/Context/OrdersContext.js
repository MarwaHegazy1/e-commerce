import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

export let OrdersContext=createContext();
function getAllOrders(cartOwnerId){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwnerId}`)
         .then((response)=>response)
        .catch((error)=>error)
}
export function OrdersContextProvider(props){

    const[cartOwner,setCartOwmer]=useState('')
    let {getLoggedUserCart}=useContext(CartContext)

    async function getCartOwnerId(){
        let {data} =await getLoggedUserCart();
          setCartOwmer(data?.data.cartOwner)
    }
    useEffect(()=>{
        getCartOwnerId()
    },[])
    return <OrdersContext.Provider value={{cartOwner,setCartOwmer,getAllOrders}}>
         {props.children}
    </OrdersContext.Provider>
    
    
}