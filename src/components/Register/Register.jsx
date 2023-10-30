import React, { useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function Register() {
  let user={
    name:'',
    phone:'',
    password:'',
    rePassword:'',
    email:'',
  }
   let navigate = useNavigate();
  const [error,setError]=useState(null)
  const [isLoading,setIsLoading]=useState(false)


  async function registerSubmit(values){
    setIsLoading(true)
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
   .catch((error)=>{
    setIsLoading(false)
    setError(error.response.data.message)})
  
    if(data.message==='success'){
      setIsLoading(false)
      navigate('/login')
    }
  }

  let validationSchema=Yup.object({
    name:Yup.string().required('name required').min(3,'min 3').max(10,'max 10'),
    email:Yup.string().required('email requird').email('enter a valid email'),
    phone:Yup.string().required('phone required').matches(/^01[0125][0-9]{8}$/,'enter a valid phone'),
    password:Yup.string().required('password required').matches(/^[A-Z][a-z0-9]{6,10}$/,'enter a valid password'),
    rePassword:Yup.string().required('repassword required').oneOf([Yup.ref('password')],'password and repassword do not match')
  })

  let formik=useFormik({
    initialValues:user,
    validationSchema,
    onSubmit:registerSubmit
  })


  return <>
    <Helmet>
        <meta name="description" content=" " />
        <title>Register</title>
  </Helmet>
  <div className="w-75 mx-auto py-5">
{error!==null?    <div className="alert alert-danger">{error}</div>:''}
    <h3>Register Now</h3>
     
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text"  className='form-control' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.name && formik.touched.name?<div className='alert alert-danger mt-2 p-2'>{formik.errors.name}</div>:''}

      <label htmlFor="email">Email:</label>
      <input type="email"  className='form-control' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.email && formik.touched.email?<div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div>:''}

      <label htmlFor="phone">Phone:</label>
      <input type="tel"  class='form-control' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger mt-2 p-2'>{formik.errors.phone}</div>:''}

      <label htmlFor="password">Password</label>
      <input type="password"  className='form-control' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.password && formik.touched.password?<div className='alert alert-danger mt-2 p-2'>{formik.errors.password}</div>:''}

      <label htmlFor="rePassword">Repassword</label>
      <input type="password"  className='form-control' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-danger mt-2 p-2'>{formik.errors.rePassword}</div>:''}
      
      {isLoading?  <button type='button'  className='btn bg-main text-white mt-2'>
        <i className="fas fa-spinner fa-spin"></i>
      </button>: <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-2'>Register</button>}


    </form>
  </div>
   
  </>
  
}/*Already have an account?*/