import React from 'react'
import { ethers } from 'ethers';

const Demo = ({state,account}) => {
    const {contract} = state;
    const buyTicket = async()=>{
        const tx = await contract.mint(1, 10, { value: ethers.parseEther("0.00005") });
        await tx.wait();
        console.log(tx)
    }
    const getSeatsTaken = async()=>{
        const tx = await contract.getSeatsTaken(1)
        console.log(tx)
    }
    const scanTicket = async()=>{
        const tx = await contract.scanTicket(1)
    }
  return (
    <div>
        <button onClick={buyTicket}>Buy</button>
        <button onClick={getSeatsTaken}>Get</button>

    </div>
  )
}

export default Demo
