import React, { useContext, useState } from 'react'
import Style from './FeaturedProducts.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import {RotatingLines} from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext'
import {Helmet} from "react-helmet";


export default function FeaturedProducts() {
  let {addToCart,cartNum,setCartNum} =useContext(CartContext)
  let {addUserWishList}=useContext(WishListContext)

  async function addProductToCart(productId){
    let {data} = await addToCart(productId);
    //console.log(data);
    if(data?.status==='success'){
      toast.success(data?.message,{duration:4000,position:'top-center'})
      if(data?.numOfCartItems>=0){
        setCartNum(data?.numOfCartItems)
      //  localStorage.setItem('cartNumber',cartNum)
      }
      else{setCartNum(0)}}
    else{toast.error('Not added to cart',{duration:4000,position:'top-center'})}
  }

  async function addProductToWishList(productId){
    let {data}= await addUserWishList(productId);
    //console.log(data);
    if(data?.status==='success'){
      toast.success(data?.message,{duration:4000,position:'top-center'})
    }
    else{toast.error(data?.error)}
  }
  
  function getFeaturedProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
 let {data,isLoading}= useQuery('featuredProducts' , getFeaturedProducts)
 //console.log(data);

  const [isActive, setIsActive] = useState(true);
  const handleClick = (id)=> {setIsActive(current => !current);};

  return <>
  <Helmet>
        <meta name="description" content=" " />
        <title>Products</title>
  </Helmet>
  {isLoading?<div className="loading w-100 vh-100 d-flex justify-content-center align-items-center">
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
    </div> : <div className="container py-4">
      <div className="row gy-5 ">
       { data?.data.data.map((item,index)=> <div key={index} className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
          <div className="product cursor-pointer px-2 py-3 ">
            <Link to={`/productdetails/${item.id}`} className='text-decoration-none text-black ' >
              <img src={item.imageCover} alt={item.title} className='w-100 mb-2'/>
              </Link>
              <div className='d-flex justify-content-between align-items-center'>
               <div>
                <span className='text-success font-sm fw-bolder  '>{item.category.name}</span>
                <h3 className='border-bottom py-2 h6'>{item.title.split(' ').slice(0,2).join(' ')}</h3>
               </div>
               <div onClick={()=>{addProductToWishList(item.id);handleClick(item.id)}}>{isActive?<i class="fa-regular fa-heart text-black fa-xl"></i>:<i class="fa-solid fa-heart text-danger fa-xl"></i>}</div>
            
              </div>
              <div className='d-flex justify-content-between mt-3'>
                <span>{item.price} EGP</span>
                <span><i className="fas fa-star text-warning"></i> {item.ratingsAverage}</span>
              </div>
           
            <div className='text-center overflow-hidden'> 
              <button  onClick={()=>addProductToCart(item.id)} className='btn bg-main text-white mt-2 btn-sm  w-100 addCart'>add to cart</button>
            </div>
          </div>
        </div>)}
      </div>
    </div>}
  </>
  
}/*onClick={handleClick}}>{isActive?<i class="fa-regular fa-heart text-black fa-xl"></i>:<i class="fa-solid fa-heart text-danger fa-xl"></i>} */
//
//              