/* eslint-disable react/prop-types */

import CircularProgressBar from "./CircularProgressBar";



export default function Mem({ data }) {


  const {
    freeMem,
    memUsage,
    totalMem,
    //usedMem
  } = data;


  const totalMemInGB = Math.floor(totalMem / 1073741824 * 100) / 100;
  const freeMemInGB = Math.floor(freeMem / 1073741824 * 100) / 100;
  return (

    <div className="flex flex-col justify-between h-full  bg-red-100 border border-red-600 rounded-md m-2  ">


      <div>
      <div className='border-b border-red-500 '>
      <h3 className="text-center sm:text-xl font-bold sm:font-semibold text-xl line-clamp-1 text-red-700 pb-1 pt-3 ">Memory Useage</h3></div>
       <div className="pt-8">
       <CircularProgressBar aspect={120} percentage={memUsage*100 } />
       </div>

      </div>
     

      
      <div>
       <h3 className="mb-1 text- font-bold  line-clamp-1 text-center text-rose-700">Memory</h3>
        <div className="flex w-full justify-around mb-3">
        <p className='font-bold text-sm text-rose-500'>Total: {totalMemInGB } GB</p>
        <p className='font-bold text-sm text-purple-500'>Free: {freeMemInGB } GB</p>
        </div>
      </div>
    </div>
  )
}
