import React from 'react'
import Style from './Home.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySilder from '../CategorySilder/CategorySilder'
import MainSilder from '../MainSilder/MainSilder'
import {Helmet} from "react-helmet";
import useNetwork from '../../Hooks/useNetwork'

export default function Home() {
  let x=useNetwork();

  return <>
   <Helmet>
        <meta name="description" content=" " />
        <title>Fresh Cart Home</title>
  </Helmet>
      {x}
   <MainSilder/>
   <CategorySilder/>
   <FeaturedProducts/>
  </>
  
}
