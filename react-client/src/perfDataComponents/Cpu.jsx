/* eslint-disable react/prop-types */

import CircularProgressBar from './CircularProgressBar';



export default function Cpu({data}) {


  return (
    <div className='h-full bg-yellow-100 border border-yellow-600 rounded-md m-2 ' >
      <div className='border-b border-yellow-500 '>
      <h3 className="text-center sm:text-xl font-bold sm:font-semibold text-xl line-clamp-1 text-yellow-700 pb-1 pt-3 ">CPU Load</h3></div>
      <div className='pt-8'>
      <CircularProgressBar  aspect={120}  percentage ={data.cpuLoad}  belowText="true"/> 
      </div>
    </div>
   
  );
} 