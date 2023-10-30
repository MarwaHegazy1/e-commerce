import React from 'react'
import Style from './CategorySilder.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from "react-slick";

export default function CategorySilder() {
  function getCategorySilder(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let {isLoading,isError,data}=useQuery('categorySilder' ,getCategorySilder)
  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
 // console.log(data)
  
  
  return <>
   <div className="container">
      {data?.data.data?<div className='py-3'>
        <Slider {...settings}>
          {data?.data.data.map((category,index)=>{return   <img  key={category.id} src={category.image}  alt={data?.data.data.title} height={200} className='my-2'/>})}
        </Slider></div>:''}
   </div>
  </>
  
}
