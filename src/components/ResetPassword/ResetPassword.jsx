import React, {useState } from 'react'
import Style from './ResetPassword.module.css'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Helmet} from "react-helmet";

export default function ResetPassword() {
 let userEmail= localStorage.getItem('userEmail')

let user={
 email:userEmail,
 newPassword:'',
}
let navigate = useNavigate();
const [error,setError]=useState(null)
const [isLoading,setIsLoading]=useState(false)

let validationSchema=Yup.object({
  email:Yup.string().required('email requird').email('enter a valid email'),
  newPassword:Yup.string().required('password required').matches(/^[A-Z][a-z0-9]{6,10}$/,'enter a valid password'),
})

async function changePassword(values){
  setIsLoading(true)
  let {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values).catch((error)=>{
    setError(error.response.data.message)
    setIsLoading(false)
   // console.log('in catch state ');
   // console.log(data);
 })
    if(data.token!==null){
    //  console.log('in success state ');
    //  console.log(data);
    setIsLoading(false)
    setError(true)
    toast.success('Done',{duration:4000,position:'top-center'})
    navigate('/login')

  }else{
   // console.log('in error state ');
   // console.log(data);
    setError(false)
    toast.error('Reset the code again',{duration:4000,position:'top-center'})
    }
  //console.log(data);
}
let formik=useFormik({
  initialValues:user,
  validationSchema,
  onSubmit:changePassword
})

  return <> 
     <Helmet>
        <meta name="description" content=" " />
        <title>Reset password</title>
  </Helmet>
    <div className="w-75 mx-auto py-5">
        <h3>Enter a new password</h3>

        <form onSubmit={formik.handleSubmit}>
        {error!==null?    <div className="alert alert-danger">{error}</div>:''}

          <label htmlFor="email" className='ms-1 mt-2 mb-1'>Email :</label>
          <input type="email"  className='form-control' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.email && formik.touched.email?<div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div>:''}
          
          <label htmlFor="newPassword" className='ms-1 mt-2 mb-1'>New password :</label>
          <input type="password"  className='form-control' name='newPassword' value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.newPassword && formik.touched.newPassword?<div className='alert alert-danger mt-2 p-2'>{formik.errors.newPassword}</div>:''}
    
          {isLoading?  <button type='button'  className='btn bg-main text-white mt-3'>
          <i className="fas fa-spinner fa-spin"></i>
          </button>:<button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-3'>Next</button>}
              
        </form>
    </div>
  </>
  
}
 // currentPassword:'',
  //password:'',
 // rePassword:'',
  //currentPassword:Yup.string().required('current password required'),
  //password:Yup.string().required('password required').matches(/^[A-Z][a-z0-9]{6,10}$/,'enter a valid password'),
  //rePassword:Yup.string().required('repassword required').oneOf([Yup.ref('password')],'password and repassword do not match')