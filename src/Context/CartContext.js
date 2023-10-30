import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();
    let headers = {token:localStorage.getItem('userToken')}

    function addToCart(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {productId:productId},{headers:headers})
        .then((response)=>response)
        .catch((error)=>error)
    }
    function getLoggedUserCart(){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:headers}) 
        .then((response)=>response)
        .catch((error)=>error)
    }
    function removeCartItem(productId){
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
       .then((response)=>response)
       .catch((error)=>error)
    }
    function UpdateProductQuantity(productId,count){
       return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {count:count},{headers})
        .then((response)=>response)
       .catch((error)=>error)
    }
    function ClearCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
    }
    function onlinePayment(cartId,url,values){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {shippingAddress:values},{headers})
        .then((response)=>response)
        .catch((error)=>error)
     }
   
    export function CartContextProvider(props){
    
        const[cartId, setCartId] = useState(null)
        const [cartNum, setCartNum] = useState(null)
      
        async function getCartId(){
            let {data} =await getLoggedUserCart();
            setCartId(data?.data._id)
        }
        useEffect(()=>{
            getCartId()
        },[])
    return <CartContext.Provider value={{cartNum,setCartNum,cartId,addToCart ,getLoggedUserCart, removeCartItem,UpdateProductQuantity,ClearCart,onlinePayment}}>
            {props.children}
    </CartContext.Provider>
}
