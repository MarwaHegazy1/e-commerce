import React, { useContext, useState } from 'react'
import Style from './ForgetPassword.module.css'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';
import {Helmet} from "react-helmet";

export default function ForgetPassword() {
  let user={
    email:'',
  }
  let {setUserEmail,setUserToken}=useContext(UserContext)
   let navigate = useNavigate();
  const [error,setError]=useState(null)
  const [isLoading,setIsLoading]=useState(false)

  async function forgetPassword(values){
    setIsLoading(true)
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
    .catch((error)=>{
      setIsLoading(false)
      setError(error.response.data.message)
    })
      if(data.statusMsg==='success'){
       // console.log(data);
       // console.log(values);
      localStorage.setItem('userEmail',values.email)
      setUserEmail(values.email)
     // console.log( localStorage.getItem('userEmail'))
        setIsLoading(false)
        setError(true)
        toast.success(data.message,{duration:4000,position:'top-center'})
        navigate('/verifyresetCode')
      }
      else { 
        setError(false)
        toast.error(data.response.data.message,{duration:4000,position:'top-center'})
      }
    }

  let validationSchema=Yup.object({
    email:Yup.string().required('email requird').email('enter a valid email'),
  })
  let formik=useFormik({
    initialValues:user,
    validationSchema,
    onSubmit:forgetPassword
  })
  return <>
    <Helmet>
        <meta name="description" content=" " />
        <title>Forget Password</title>
  </Helmet>
   <div className="w-75 mx-auto py-5">
    <h3>Enter your email</h3>
    <form onSubmit={formik.handleSubmit}>
      {error!==null?    <div className="alert alert-danger">{error}</div>:''}
      <label htmlFor="email" className='mb-2 ms-1'>Email:</label>
      <input type="email"  className='form-control mb-2' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.email && formik.touched.email?<div className='alert alert-danger my-2 p-2'>{formik.errors.email}</div>:''} 
      
      {isLoading?  <button type='button'  className='btn bg-main text-white mt-2'>
            <i className="fas fa-spinner fa-spin"></i>
          </button>:
      <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-3 mx-2'>Next</button>}

    </form>
  </div>
   
  </>
  
}