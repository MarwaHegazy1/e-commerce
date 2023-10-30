import React, { useEffect, useState } from 'react'
import Style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from "react-slick";
import {Helmet} from "react-helmet";


export default function ProductDetails() {
  let {id} = useParams()
   function getProductDetails(id)
{
 return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}
let {data ,isLoading,isError}=useQuery('productDetails',()=>getProductDetails(id))



var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,autoplay:true
};
return <>
 <div className="container">
     {data?.data.data? <div className="row py-2 align-items-center">
      <Helmet>
        <meta name="description" content=" " />
        <title>{data?.data.data.title}</title>
      
      </Helmet>
        <div className="col-md-4 ">
          <div className='mb-3'>
          
            <Slider {...settings}>
            {data?.data.data.images.map((imgSide,index)=>{return   <img src={imgSide} key={index} alt={data?.data.data.title} className='w-100'/>})}
            </Slider>
          </div>
        </div>
        <div className="col-md-8 border-bottom border-start py-3">
          <div>
            <h2 className='text-success h5 fw-bold'>{data?.data.data.title}</h2>
            <p className='my-3 text-secondary'>{data?.data.data.description}</p>
            <h6>{data?.data.data.category.name}</h6>
            <div className="d-flex justify-content-between align-items-center">
              <span className='fw-bold'>{data?.data.data.price} EGP</span>
              <span className='my-4'><i className="fas fa-star text-warning"></i> {data?.data.data.ratingsAverage}</span>
            </div>
          </div>
          <button className="btn bg-main w-100 text-white">add to cart</button>
        </div>
      </div>:''}
    </div>
  </> 
  
}
