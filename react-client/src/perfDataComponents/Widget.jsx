import Cpu from "./Cpu.jsx"
import Mem from "./Mem.jsx"
import Info from "./Info.jsx"
import './Widget.css'
import socket from "../utilities/socketConnection.js";
import { useEffect, useState } from "react";
export default function Widget({data}) {
const [isAlive ,setIsAlive] = useState(true) ;
  const  {
    freeMem,
    totalMem,
    usedMem,
    memUsage,
    cpuType,
    osType,
    upTime,
    numCores,
    cpuSpeed,
    cpuLoad ,
    macA
} = data ; 
const cpuData= {cpuLoad }
const memData = {freeMem,totalMem ,usedMem, memUsage} 
const infoData = {macA , osType,upTime,numCores ,cpuType, cpuSpeed }
const notAliveDiv = !isAlive?<div className="not-active">Offline</div>:<></>
useEffect(()=>{
  socket.on("connectedOrNot" ,({isAlive , machineMacA})=>{
    //connected or not means this client has disconnected (reconnected)
    // it is for oneof the node client that is ticking
    // we need a new event for that ,because node client has stopped ticking
    if(machineMacA===macA){
         setIsAlive(isAlive) ;  //true or false , update isAlive
    }



  } )

},[]) ; 




  return (
    <div className="widget row justifu-content-evenly">
      <h1>Widget</h1>
       {notAliveDiv}
      <Cpu data = {cpuData}/>
      <Mem data = {memData} />
      <Info data = {infoData}/>
    </div>
  )
}
