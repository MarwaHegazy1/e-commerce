import React, { useContext, useEffect } from 'react'
import Style from './Profile.module.css'
import jwtDecode from 'jwt-decode'
import { UserContext } from '../../Context/UserContext'


export default function Profile() {
  let {userData}=useContext(UserContext)

  let encodedToken=localStorage.getItem('usertoken')
  let decodedToken = jwtDecode(encodedToken)
  
  return <>
   
  </>
  
}
/*{<h2>Hello {userData?.name}</h2>}*/