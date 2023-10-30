import React from 'react'
import Style from './MainSilder.module.css'
import Slider from "react-slick";
import slider1 from '../../Assets/images/slider-image-3.jpeg'
import slider2 from '../../Assets/images/grocery-banner.png'
import slider3 from '../../Assets/images/slider-image-2.jpeg'
import blog1 from '../../Assets/images/slider-2.jpeg'
import blog2 from '../../Assets/images/grocery-banner-2.jpeg'

export default function MainSilder() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return <>
    <div className="container py-5">
      <div className="row g-0">
        <div className="col-md-9">
        <Slider    {...settings}>
          <img src={slider1}  alt="slider1" className='w-100' height={400}/>  
          <img src={slider2} alt="slider2"  className='w-100' height={400}/>  
          <img src={slider3} alt="slider3"  className='w-100' height={400}/>        
   
        </Slider>

        </div>
        <div className="col-md-3">
        <img src={blog1} alt="blog1"   className='w-100' height={200}/>     
        <img src={blog2} alt="blog2"  className='w-100' height={200}/>     

        </div>
      </div>
     </div>
  </>
  
}
