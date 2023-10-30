import React, { useContext, useEffect, useState } from 'react'
import Style from './WishList.module.css'
import { WishListContext } from '../../Context/WishListContext';
import {Helmet} from "react-helmet";
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext'

export default function WishList() {
  let {getLoggedUserWishList,removeWishListItem}=useContext(WishListContext)
  const [wishList,setWishList]=useState(null)  
  let {addToCart,setCartNum} =useContext(CartContext)

  async function getWishList(){
    let {data} = await getLoggedUserWishList();
    setWishList(data)
  //  console.log(data.data);
  }
async function removeItem(id){
  let {data}=await removeWishListItem(id)
  if(data.status==='success'){
    toast.success(data.message,{duration:4000,position:'top-center'})
    getWishList()
   // console.log(data);
  }
    else{toast.error(data.statusMsg)}
}
async function addProductToCart(productId){
  let {data} = await addToCart(productId);
  //console.log(data);
  if(data.status==='success'){
    toast.success(data.message,{duration:4000,position:'top-center'})
      setCartNum(data?.numOfCartItems)
    
   }
  else{toast.error(data.error)}
}

 useEffect(()=>{
  getWishList()
 })

  return <>
    <Helmet>
        <meta name="description" content=" " />
        <title>Wish List</title>
  </Helmet>
 <div className="container">
 <div className="w-75 mx-auto pt-3 px-3 bg-main-light my-3">
  <h3 className='fw-bold text-main p-2'>wish List <i class="fa-solid fa-heart-circle-check"></i></h3>
    {wishList?.data.map((item,index)=><div key={index} className='row border-bottom p-2 align-items-center'>
      <div className="col-md-2">
      <img src={item.imageCover} alt={item.slug} className='w-100'/>
      </div>
      <div className="col-md-9">
       <div className='d-flex justify-content-between align-items-start'>
        <div>
          <p >{item.title}</p>
          <p className='fw-bold'>Price: {item.price} EGP</p>
        </div>
        <div onClick={()=>removeItem(item.id)} className='bg-white rounded-circle p-1 cursor-pointer'>
          <i className="text-danger font-sm  fas fa-trash-can"></i>
        </div>
       </div>
        <button onClick={()=>addProductToCart(item.id)} className='w-100 btn bg-main text-white btn-sm' >Move To Cart</button>

      </div>
      </div>)}
   </div>
  </div>
  </>
}
