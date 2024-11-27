/* eslint-disable react/prop-types */
import moment from 'moment';

export default function SysInfo({ data }) {

    return (
        // <div className="col-sm-3 col-sm-offset-1 cpu-info">
        //   <h3>Operating System</h3>
        //   <div className="widget-text">{data.osType}</div>
        //   <h3>Time Online</h3>
        //   <div className="widget-text">{moment.duration(data.upTime).humanize()}</div>
        //   <h3>Processor information</h3>
        //   <div className="widget-text"><strong>Type:</strong> {data.cpuType}</div>
        //   <div className="widget-text"><strong>Number of Cores:</strong> {data.numCores}</div>
        //   <div className="widget-text"><strong>Clock Speed:</strong> {data.cpuSpeed}</div>
        // </div>

        <div className='grid grid-cols-5 sm:grid-cols-1 mt-3 sm:mt-2 sm:grid-rows-2 h-full  border-yellow-600 rounded-md  sm:gap-y-2'>

            <div className=' pt-2 left-part col-span-2 sm:col-span-5 row-span-1 mx-2  bg-green-100 border border-green-600 rounded-md '>
                <div className='border-b border-green-500'>
                <h3 className=' sm:text-xl mb-1 pl-2 font-bold sm:font-semibold text-sm line-clamp-1 text-green-700'>Operating System</h3>
                </div>
                <p className=' pl-2'>
                     <span className='font-bold text-sm text-green-500'>OS: </span>
                     <span className='font-semibold text-sm text-green-400'>{data.osType}</span>
                </p>
                <p className=' pl-2'><span className='font-bold text-sm text-green-500'>Uptime: </span>
                  <span className='font-semibold text-sm text-green-400' >{moment.duration(data.upTime).humanize()}</span>
                </p>
            </div>
            <div className=' pt-2  right-part col-span-3 sm:col-span-5 row-span-1 mx-2  bg-blue-100 border border-blue-600 rounded-md '>
                <div className='border-b border-blue-500 '>
                <h3 className="pl-2 mb-1 sm:text-xl font-bold sm:font-semibold text-sm line-clamp-1 text-blue-700">Processor Info</h3>

                </div>
                <p className=' pl-2'><span  className='font-bold text-sm text-blue-500'>Cores: </span> 
                    <span  className='font-semibold text-sm text-blue-400'>{data.numCores}</span>
                </p>
                <p className=' pl-2' >
                     <span className='font-bold text-sm text-blue-500'>Clock Speed: </span> 
                     <span className='font-semibold text-sm text-blue-400'>{data.cpuSpeed}</span> </p>
                <p className=' pl-2'>
                     <span className='font-bold text-sm text-blue-500'>Type: </span>
                     <span className='font-semibold text-sm text-blue-400'>{data.cpuType}</span>
                </p>
            </div>

        </div>

    );
}
