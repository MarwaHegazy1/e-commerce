import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function Cart() {  
  let {getLoggedUserCart,removeCartItem,UpdateProductQuantity,ClearCart,setCartNum}=useContext(CartContext);
  const [cartDtails,setCartDetails]=useState(null)   

  async function getCart(){
    let {data} = await getLoggedUserCart()
    setCartDetails(data)
    setCartNum(data?.numOfCartItems)   
   // console.log(data)
   // console.log(data.data.cartOwner)
    //console.log(data.numOfCartItems)
  }
  async function removeItem(id){
    let {data} = await removeCartItem(id);
    setCartDetails(data)
    setCartNum(data?.numOfCartItems)
  }
  async function updateCount(id,count){
    let {data} = await UpdateProductQuantity(id,count);
    if(count<=0){ removeItem(id)}
    setCartDetails(data)
  }
  async function ClearAllCart(){
    let {data}= await ClearCart();
    setCartDetails(null)
    setCartNum(null)
  }
  useEffect(()=>{
    setCartNum(cartDtails?.numOfCartItems)  
    getCart()
  },[])


  return <>
   <Helmet>
        <meta name="description" content=" " />
        <title>Cart</title>
  </Helmet>
   {cartDtails? 
      <div className="container">
          <div className="w-75 mx-auto pt-3 px-3 bg-main-light my-3">
          <div className='d-flex justify-content-between align-items-center '>
              <h3>Shopping Cart</h3>
              <button onClick={()=>ClearAllCart()} className='btn btn-sm bg-main text-white '>Clear Cart</button>
          </div>
            <h4 className='h6 text-main fw-bold'>Cart Items : {cartDtails.numOfCartItems}</h4>
            <h4 className='h6 text-main fw-bold'>Total Cart price : {cartDtails.data.totalCartPrice}</h4>
            {cartDtails.data.products.map((product)=><div key={product.product.id} className="row border-bottom p-2">
              <div class="col-md-2">
                <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
              </div>
              <div className="col-10">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className='h6'>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
                    <h6 className='text-main'>Price : {product.price} EGP</h6>
                  </div>
                  <div>
                    <button onClick={()=>{updateCount(product.product.id,product.count+1)}} className='btn border-main p-1'>+</button>
                    <span className='px-2'>{product.count}</span>
                    <button onClick={()=>{updateCount(product.product.id,product.count-1)}} className='btn border-main p-1'>-</button>
                  </div>
                </div>
                <button onClick={()=>removeItem(product.product.id)} className='btn p-0 text-danger'><i className="text-danger font-sm  fas fa-trash-can"></i> Remove</button>
              </div>
            </div>)}
          <div className='py-4 px-2 text-end'>
          <Link to={'/address'} className=' btn me-2 bg-main text-white btn-sm'>Online Payment</Link>
            <Link className='btn bg-main text-white btn-sm'>Cash on Delivery</Link>
          </div>
          </div>
      </div> :<div className="container">
        <div className="w-75 mx-auto pt-3 px-3 bg-main-light my-3">
        <div className='d-flex justify-content-between align-items-center '>
            <h3>Shopping Cart</h3>
        </div>
          <h4 className='h6 text-main fw-bold'>Cart Items : 0</h4>
          <h4 className='h6 text-main fw-bold'>Total Cart price : 0</h4>
          <p className='fw-bolder text-center py-4 fa-2xl'>The cart is empty</p>
        </div>
      </div> 
     }
  </>
  
}
/*{clear==null?
 :
      <div className="container">
        <div className="w-75 mx-auto pt-3 px-3 bg-main-light my-3">
        <div className='d-flex justify-content-between align-items-center '>
            <h3>Shopping Cart</h3>
        </div>
          <h4 className='h6 text-main fw-bold'>Cart Items : 0</h4>
          <h4 className='h6 text-main fw-bold'>Total Cart price : 0</h4>
          <p className='fw-bolder text-center py-4 fa-2xl'>The cart is empty</p>
        </div>
      </div> 
       if(localStorage.getItem('userCart') =='success'){
      setClear(localStorage.getItem('userCart'))
    }else{
      localStorage.removeItem('userCart')
      setClear(null)
    }
   localStorage.setItem('userCart',data.message)
    setClear(data.message)

    console.log(localStorage.getItem('userCart'));
  
   <section id='loading' className='d-flex justify-content-center vh-100 align-items-center'>
        <i className="fas fa-spinner fa=spin fa-3x text-main"></i>
      </section>}*/