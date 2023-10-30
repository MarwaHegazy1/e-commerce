import axios from "axios";
import { createContext } from "react";

export let WishListContext=createContext();
let headers = {token:localStorage.getItem('userToken')}

function addUserWishList(productId){
    return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {productId:productId},{headers:headers})
    .then((response)=>response)
    .catch((error)=>error)
  }

  function getLoggedUserWishList(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers:headers}) 
     .then((response)=>response)
     .catch((error)=>error)
 }
 function removeWishListItem(productId){
    return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
    .then((response)=>response)
    .catch((error)=>error)
 }
  
 


export function WishListContextProvider(props){
    return <WishListContext.Provider value={{addUserWishList,getLoggedUserWishList,removeWishListItem}}>
        {props.children}
    </WishListContext.Provider>
}