"use client";
import React, { useEffect } from 'react'

const page = () => {
    useEffect(()=>{
        console.log(localStorage.getItem("account"))
        console.log(JSON.parse(localStorage.getItem("contract")))
    },[])
  return (
    <div>
      
    </div>
  )
}

export default page
