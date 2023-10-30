import React, { useState } from 'react'
import Style from './VerifyResetCode.module.css'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function VerifyResetCode() {
  
  let user={
    resetCode:'',
  }
  let navigate = useNavigate();
  const [error,setError]=useState(null)  

    async function getCode(values){
    let {data,statusText}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values).catch((error)=>{
      setError(error.response.data.message)
      console.log(error.response.data.message)
    })
    //console.log(statusText)
    //console.log(data)

    if(data.status==='Success'){
      setError(true)
        toast.success(statusText,{duration:4000,position:'top-center'})
        navigate('/resetpassword')
      }else { 
        setError(null)
        toast.error(data.response.data.message,{duration:4000,position:'top-center'})
        console.log(data.response.data.message);
      }
}
  let validationSchema=Yup.object({
    resetCode:Yup.string().required('code required')
  })

let formik=useFormik({
  initialValues:user,
  validationSchema,
  onSubmit:getCode
})
  return <>
   <Helmet>
        <meta name="description" content=" " />
        <title>Verify ResetCode</title>
  </Helmet>
  <div className="w-75 mx-auto py-5">
    <h3>Enter the code</h3>
    <form onSubmit={formik.handleSubmit}>
      {error!==null?    <div className="alert alert-danger">{error}</div>:''}
      <label htmlFor="resetCode" className='ms-1'>Code :</label>
      <input type="tel"  className='form-control' name='resetCode'  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.currentPassword && formik.touched.currentPassword?<div className='alert alert-danger mt-2 p-2'>{formik.errors.currentPassword}</div>:''}
      <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-2'>Next</button>
    </form>
  </div>
  </>
  
}
