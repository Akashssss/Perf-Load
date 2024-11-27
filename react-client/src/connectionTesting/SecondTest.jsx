import { useEffect } from "react"
import socket from "../socketConnection"
export default function SecondTest() {

  useEffect(()=>{
    socket.emit("secondTest" ,"am i second connected ? ")
  } ,[])

  return (
    <div>secondTest</div>
  )
}
