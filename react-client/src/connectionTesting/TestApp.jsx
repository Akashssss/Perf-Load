import { useEffect } from 'react'
import socket from '../socketConnection'
import SecondTest from './SecondTest.jsx';



export default function TestApp() {

 useEffect(()=>{
  socket.emit("testConnection" , "am i connected") ; 

 },[])




  return (
    <>
    <h1>TestApp</h1>
    <SecondTest/> 
    </>
  )
}
