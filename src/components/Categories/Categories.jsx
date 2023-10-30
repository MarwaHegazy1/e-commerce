import React from 'react'
import Style from './Categories.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import {RotatingLines} from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";

export default function Categories() {
  
  function getCategories(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let {data,isLoading}= useQuery('categories' , getCategories)
 // console.log(data);

  return <>
  <Helmet>
        <meta name="description" content=" " />
        <title>Categories</title>
  </Helmet>
  {isLoading?<div className="loading w-100 vh-100 d-flex justify-content-center align-items-center">
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}/></div>:
  <div className="container">
    {data?.data.data?<div className='row py-3'>
      {data?.data.data.map((category)=><div key={category._id} className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
      <div className="product cursor-pointer px-2 py-3 ">
        <Link to={`/categorydetails/${category._id}`} className='text-decoration-none text-black ' >
          <img src={category.image}  alt={data?.data.data.slug} height={200} className='w-100 mb-2'/>
          <h2 className='text-success h6 fw-bolder  '>{category.name}</h2>          
        </Link>
      </div>
      </div> )}
      </div>:<h2>owhnfkwe</h2>}
  </div>}
  
  </>
  
}


