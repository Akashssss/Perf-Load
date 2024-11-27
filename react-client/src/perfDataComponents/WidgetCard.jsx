/* eslint-disable react/prop-types */
import Cpu from "./Cpu";
import Mem from "./Mem";
import SysInfo from "./SysInfo";
import { useState, useEffect } from 'react';
import socket from './../utilities/socketConnection';

export default function WidgetCard({ data }) {
    const [isAlive, setIsAlive] = useState(true);

    const {
        freeMem,
        totalMem,
        usedMem,
        memUsage,
        cpuType,
        osType,
        upTime,
        numCores,
        cpuSpeed,
        cpuLoad,
        macA
    } = data;

    const cpuData = { cpuLoad };
    const memData = { freeMem, totalMem, usedMem, memUsage };
    const infoData = { macA, osType, upTime, numCores, cpuType, cpuSpeed };

    const notAliveDiv = !isAlive ? <div className="not-active font-bold text-4xl absolute top-1/2  -rotate-45">Offline</div> : <></>;

    useEffect(() => {
        socket.on("connectedOrNot", ({ isAlive, machineMacA }) => {
            if (machineMacA === macA) {
                setIsAlive(isAlive); // Update isAlive status
            }
        });

        // Cleanup the socket listener on component unmount
        return () => {
            socket.off("connectedOrNot");
        };
    }, [macA]);

    // Conditional class for the "faded" effect when the machine is offline
    const offlineClass = isAlive ? '' : 'grayscale opacity-50 '; // Grayscale and reduced opacity

    return (
        <div className="sm:m-10 m:1 my-6  relative">
                                    {notAliveDiv}
            <div className={`rounded-md bg-gray-100 ${offlineClass}`}>
                <h1 className="mx-1 pt-2 pl-1 font-bold text-xl text-slate-600">
                    <span className="text-black">Machine ID: </span>{data.macA.split('-')[0]}
                </h1>
                <div className="w-full grid sm:grid-cols-3 grid-col-2 pb-8 p-4 sm:p-5">
                    <div className="left-div grid grid-cols-2 col-span-2">
                        <div className="col-span-1 h-[350px] sm:h-[350px]">
                            <Cpu data={cpuData} />
                        </div>
                        <div className="col-span-1 h-[350px] sm:h-[350px]">
                            <Mem data={memData} />
                        </div>
                    </div>
                    <div className="right-div sm:col-span-1 col-span-2 sm:h-[350px]">
                        <SysInfo data={infoData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
