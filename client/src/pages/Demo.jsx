import React from 'react'
import { ethers } from 'ethers';

const Demo = ({state,account}) => {
    const {contract} = state;
    const buyTicket = async()=>{
        const tx = await contract.mint(1, 15, { value: ethers.parseEther("0.00005") });
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
    const accessProfile = async()=>{
        const tx = await contract.getUserTickets(account)
        console.log(tx)
    }
  return (
    <div>
        <button onClick={buyTicket}>Buy</button>
        <button onClick={getSeatsTaken}>Get</button>\
        <button onClick={accessProfile}>Access</button>

    </div>
  )
}

export default Demo
