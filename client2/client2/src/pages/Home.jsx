import React from 'react'
import { ethers } from 'ethers'

const Home = ({state}) => {
    const {contract} = state;
    console.log(contract)
    const use=async()=>{
        const tx = await contract.list("Blockchain Summit",  // _name
    ethers.parseEther("0.1"), // _cost (converted to Wei)
    100,  // _maxTickets
    "2025-05-10",  // _date
    "18:00",  // _time
    "New York, USA",  // _location
    "https://example.com/vr-video.mp4")
    }
  return (
    <div>
      <button onClick={use}>Use</button>
    </div>
  )
}

export default Home
