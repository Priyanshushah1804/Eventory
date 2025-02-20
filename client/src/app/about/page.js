"use client";
import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';

const page = () => {
    const [contract,setContract]= useState(null)
    useEffect(()=>{
        console.log(localStorage.getItem("account"))
        console.log(JSON.parse(localStorage.getItem("contract")))
        setContract(JSON.parse(localStorage.getItem("contract")))
    },[])
    const use = async()=>{
        console.log(contract)
        const tx = await contract.list("Blockchain Summit",  // _name
    ethers.parseEther("0.0001"), // _cost (converted to Wei)
    100,  // _maxTickets
    "2025-05-10",  // _date
    "18:00",  // _time
    "New York, USA",  // _location
    "https://example.com/vr-video.mp4")
    console.log(tx)
    }
    console.log(contract)

  return (
    <div>
        <button onClick={use}>use</button>

    </div>
  )
}

export default page
