import { useEffect, useState } from 'react';
import socket from './utilities/socketConnection.js' ;
// import Widget from './perfDataComponents/Widget';
import WidgetCard from './perfDataComponents/WidgetCard';
import Navbar from './perfDataComponents/Navbar.jsx';
function App() {

  const [performanceData, setPerformanceData] = useState(new Map());
  const [isServerIsAlive ,setIsServerIsAlive] = useState(false);
  useEffect(()=>{
    //spcket was created on load of the component
    // add a listener to the socket !
    socket.on("perfData" , (data)=>{
        console.log(data.macA) ; 
        // perfomance data is not an array but its an object 
        //this is because we don't know which maching just sent it's data 
        //so we can use the macA of the machine as its property in perfomaceData 
        //every tick the data comes through, just overwrite the value 
       ;  // update the state with the new data
       setPerformanceData((prevData) => {
        const newData = new Map(prevData); // Create a new Map based on the current state
        newData.set(data.macA, data); // Update the specific machine's data
        return newData; // Return the updated Map
      });
    })
    socket.on("connect" ,()=>{
      setIsServerIsAlive(true) ;
    })
    socket.on("disconnect" ,()=>{
      setIsServerIsAlive(false) ;
    })
     console.log("use effect called ")
  } , []) 


  const offlineClass = isServerIsAlive ? '' : 'grayscale opacity-50 relative'; // Grayscale and reduced opacity

  return (
    
   <>
   <Navbar/>
    <div className='flex justify-center mt-36'>
       {!isServerIsAlive && 
          <h1 className=' font-bold text-4xl text-center absolute top-1/2 left-1/2 -translate-x-1/2 text-red-500 z-50'>Server Unreachable :(</h1>
          }
       <div  className={`${offlineClass} container`}>
       {
        performanceData.size? 
        Array.from(performanceData.entries()).map(([macA, data]) => (
          <WidgetCard key={macA} data={data} />
        ))
        : 
        <h1 className='text-center font-bold text-4xl'>No Data Available</h1>  // If no data is available display a message
       }
       </div>
        
    </div>
   
   </>


  )
}

export default App
