import React, { useEffect, useState } from 'react'

export default function useNetwork() {

    let [isOnline,setIsOnline]=useState(true)

    function detectOnline(){
        window.addEventListener('online' ,function(){
            setIsOnline(true)

        });
        window.addEventListener('offline' ,function(){
            setIsOnline(false)
        })
    }
    useEffect(()=>{
        detectOnline()
    },[])
  return<>

  {!isOnline?<div className='network'><i className="fas fa-wifi"></i> you are offline</div>:''}
  
  </>
}
