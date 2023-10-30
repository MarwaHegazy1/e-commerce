import React, { useContext, useEffect, useState } from 'react'
import Style from './Allorders.module.css'
import { OrdersContext } from '../../Context/OrdersContext'
import {Helmet} from "react-helmet";


export default function Allorders() {
  const [allOrders,setAllOrders]=useState(null)  
  let {getAllOrders,cartOwner}=useContext(OrdersContext)

  async function getUserOrder(cartOwner){
   let {data}= await getAllOrders(cartOwner)
   setAllOrders(data)
 // console.log(data);
  
}

useEffect(()=>{
  getUserOrder(cartOwner)
},[])

  return <>
   <Helmet>
        <meta name="description" content=" " />
        <title>All orders</title>
  </Helmet>
   {allOrders?
   <div className="container">
    <div className="w-75 mx-auto pt-3 px-3 bg-main-light my-3">
    <h3 className='fw-bolder'>My Orders</h3>
   {allOrders.map((order,index)=><div key={index} className="row ">
      <div className="col-md-12 ">
          <div className='d-flex justify-content-between align-items-center border-bottom '>
            <div>
            <date className='text-danger'>{order.paidAt.split('T').slice(0,1).join(' ')}</date>
            <p> <span className='text-main'>Order Number:</span> <span> {order.id} </span></p>
            </div>
            <div>
              <div className='fw-bold'>{order.totalOrderPrice} EGP</div>
            </div>
          </div>
          <div className='fw-bold py-1'>  {order.isDelivered?<><i class="fa-solid fa-check text-main"></i> Delivered</>:<><i class="fa-regular fa-thumbs-up"></i> Order Received</>} </div>
      </div>
   </div>

   ) }
    </div>
   </div>
   :''}
  </>
  
}
