import React, { useContext } from 'react'
import Style from './Address.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext';
import {Helmet} from "react-helmet";

export default function Address() {
   let {onlinePayment,cartId}=useContext(CartContext)

  async function handleAddressSubmit(values){
    let {data}=await onlinePayment(cartId ,'http://localhost:3000',values)
  //console.log(data?.session.url);
  window.location.href = data?.session.url;
}

  let formik=useFormik({
    initialValues:{
        details:'',
        phone:'',
        city:'' 
    },onSubmit:handleAddressSubmit
  })
  return <>
  <Helmet>
        <meta name="description" content=" " />
        <title>Address</title>
  </Helmet>
  <div className="container">
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="details">Details :</label>
      <input type="text" className='form-control' name='details' id='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
    
      <label htmlFor="phone">Phone :</label>
      <input type="tel" className='form-control' name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
    
      <label htmlFor="city">City :</label>
      <input type="text" className='form-control' name='city' id='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}/>

      <button type='submit' className='btn bg-main text-white'>Pay Now</button>
    </form>
    </div>  
  </>
  
}
