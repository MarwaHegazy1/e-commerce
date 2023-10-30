import React, { useEffect } from 'react'
import Style from './CategoryDetails.module.css'
import {Helmet} from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryDetails } from '../../Redux/categoryDetailsSlice';
import {RotatingLines} from 'react-loader-spinner'
import { useParams } from 'react-router-dom'


export default function CategoryDetails() {
  let {id} = useParams()
  let {isError,loading,categoryDetails}=useSelector((state)=>state.categoryDetails)
//console.log(categoryDetails);
let dispatch=useDispatch();
useEffect(()=>{
  dispatch(getCategoryDetails(id))
},[])


  return <>
  <Helmet>
        <meta name="description" content=" " />
        <title>Category Details</title>
  </Helmet>
  {loading?<div className="loading w-100 vh-100 d-flex justify-content-center align-items-center">
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
    </div> :<div className="container">
   <div className="row py-2 align-items-center">
      <Helmet>
        <meta name="description" content=" " />
        <title>{categoryDetails?._id}</title>
      </Helmet>
        <div className="col-md-4 ">
          <div className='mb-3'>
            <img src={categoryDetails.image} alt={categoryDetails?.slug} className='w-100'/>
          </div>
        </div>
        <div className="col-md-8 border-bottom border-start py-3">
          <div>
            <h2 className='text-success h5 fw-bold'>{categoryDetails?.slug}</h2>
            <h6 className='h3'>....................</h6>          
          </div>
        </div>
      </div>
    </div>}
  </>
  
}
