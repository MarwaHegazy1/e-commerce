import Style from './Login.module.css'
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Audio } from  'react-loader-spinner'
import { UserContext } from '../../Context/UserContext';
import {Helmet} from "react-helmet";

export default function Login() {
  let user={
    password:'',
    email:'',
  }
  let {setUserToken,setUserData}=useContext(UserContext)
   let navigate = useNavigate();
  const [error,setError]=useState(null)
  const [isLoading,setIsLoading]=useState(false)


  async function loginSubmit(values){
    setIsLoading(true)
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
   .catch((error)=>{
    setIsLoading(false)
    setError(error.response.data.message)})
 // console.log(data);
    if(data.message==='success'){
      setIsLoading(false)

      localStorage.setItem('userToken',data.token)
      setUserToken(data.token)
      
      localStorage.setItem('userName',data.user.name)
      setUserData(data.user.name)

      //console.log('my user token' )
      console.log(  localStorage.getItem('userToken'))
      console.log( localStorage.getItem('userName'))
      
      navigate('/home')
    }
  }

  let validationSchema=Yup.object({
    email:Yup.string().required('email requird').email('enter a valid email'),
    password:Yup.string().required('password required').matches(/^[A-Z][a-z0-9]{6,10}$/,'enter a valid password'),
  })


  let formik=useFormik({
    initialValues:user,
    validationSchema,
    onSubmit:loginSubmit
  })


  return <>
    <Helmet>
        <meta name="description" content=" " />
        <title>Login</title>
  </Helmet>
  <div className="w-75 mx-auto py-5">
{error!==null?    <div className="alert alert-danger">{error}</div>:''}
    <h3>Login Now</h3>
     
    <form onSubmit={formik.handleSubmit}>
    
      <label htmlFor="email" className='mb-2 ms-1'>Email:</label>
      <input type="email"  className='form-control mb-2' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.email && formik.touched.email?<div className='alert alert-danger my-2 p-2'>{formik.errors.email}</div>:''}

      <label htmlFor="password" className='mb-2 ms-1'>Password:</label>
      <input type="password"  className='form-control' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.password && formik.touched.password?<div className='alert alert-danger mt-2 p-2'>{formik.errors.password}</div>:''}

      {isLoading?  <button type='button'  className='btn bg-main text-white mt-3'>
            <Audio
              height = "20"
              width = "40"
              radius = "9"
              color = '#fff'
              ariaLabel = 'three-dots-loading'     
              wrapperStyle
              wrapperClass
            />
      </button>:<>
      <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-3 mx-2'>Login</button>
        <div>
          <Link  to='/forgetpassword' className='btn btn-outline-success my-2'>Forget Password?</Link>
        </div>
        <div className='d-flex align-items-center'>
          <span>you dont have an account?</span><Link to={'/register'} className='text-success btn '>Register now</Link> 
        </div>
        </>}


    </form>
  </div>
   
  </>
  
}
