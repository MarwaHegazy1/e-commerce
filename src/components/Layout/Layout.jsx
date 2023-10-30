import React ,{  useContext, useEffect } from 'react'
import Style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { Offline } from 'react-detect-offline'
import { CartContext } from '../../Context/CartContext'



export default function Layout() {
  let {setUserToken,setUserData}= useContext(UserContext)
  let {setCartNum}=useContext(CartContext)
  localStorage.getItem('cartNumber')
  useEffect(()=>{
    if(localStorage.getItem('userToken')!==null){
      setUserToken(localStorage.getItem('userToken'))
    }
    if(localStorage.getItem('userName')!==null){
      setUserToken(localStorage.getItem('userToken'))
    }
    if(localStorage.getItem('cartNumber')!==null){
      setCartNum(localStorage.getItem('cartNumber'))
    }
    if(localStorage.getItem('userName')!==null){
      setUserData(localStorage.getItem('userName'))
    }
  },[]);
  
  return <>
   <Navbar/>
   
    <Outlet/>
    <div>
     
    </div>
    
   <Footer/>
  </>
  
}
/*{ <Offline>
        <div className="network">
          <i className="fas fa-wifi"> you are offline</i>
        </div>
      </Offline>}*/
      