const os = require('os'); 
const { v4: uuidv4 } = require('uuid');

const cpus = os.cpus();
const io =  require("socket.io-client") ; 
const options  = {
    auth : {
        token : "alfjl233l4nlkdlfjdsjkfl" 
    }
}
const socket  =  io("http://127.0.0.1:3000" ,options) ; //where our server is listening 
const processToken = uuidv4() ;
socket.on('connect' , ()=>{
 //console.log("we connected to the server")

 // we need a way to identify this machine to the server for frontend usage 
 // we could use socket.id , randomHash 
 // what about macA ? 

 const nI = os.networkInterfaces() ; 
 let macA = null ; // mac address 

 //loop through all the ni untill we find a non internal one.
 for(let key in nI){
   const isInternalFacing  = !nI[key][0].internal ; 
   if(isInternalFacing){
     macA = nI[key][0].mac ;
     break ;  // no need to continue the loop once we found our macA
   }
 }
 //console.log(macA) ;
 const perfDataInterval = setInterval(async () =>{
    // every second call performance data and emit 
    const perfData = await performanceLoadData() ; 
   
   //!  REMOVE THE PROCESS TOKEN IS NODE CLIENT ARE SEPERATELY HOSTED 
   //!  THIS IS USED ONLY TO MONITOR THE DIFFERENT PROCESSES INSIDE THE SAME MACHINE 
   //!  BECAUSE ALL THE PROCESSES ON SAME MACHINE HAVE THE SAME MAC ADDRESS 
   //!  SO TO DIFFERCIATE THE DIFFERENT PROCESSES USED THE UNIQUE ID (processToken)

   
    perfData.macA = `${macA}-${processToken}`;
    socket.emit("perfData", perfData ) ;

 } ,1000) ; 


  socket.on("disconnect" , () => { 
    //is we disconnect for any reason .. stop ticking   
    // this include !!! reconnect
    clearInterval(perfDataInterval)
  } )


})























// what do you need to know from the node about performance

// cpu load
// memory usuage  ( total | free )
// OS type
// uptime 
// CPU info ( types | number of cores | clock speed )

// native to node

const getCpuLoad = ( ) => new Promise((resolve,reject)=>{
    // Because the times property on cpus is time since boot , 
    // we will ge the now times, and 100 ms from 'Now' 
    //this will give us current load 
    const start = cpuAverage( ) ; // now value of the load 
    setTimeout (() => { 
        // call cpuAverage for "end" 100ms after "now"
        const end  = cpuAverage( ) ; //"end" value of load 

        const idleDiff = end.idle - start.idle ; 
        const totalDiff = end.total - start.total ; 
        //console.log(idleDiff , totalDiff); 
         //caplculat the percentage of uses cpu 
        const percentageOfCpu = 100 - Math.floor(
            100*idleDiff/totalDiff) ;
            resolve(percentageOfCpu) ;
    } , 100 ) 
});
 
   



const performanceLoadData = () => new Promise(async (resolve,reject)=>{




// OS  info
const osType = os.type() ==='Darwin'? 'Mac':os.type(); 

const upTime  = os.uptime(); // in seconds

const freeMem = os.freemem(); // in bytes 

const totalMem = os.totalmem(); // in bytes

//-  memory useage ( totalmem - freeMem )
const usedMem =totalMem - freeMem; 
const memUsage = Math.floor(usedMem /totalMem*100)/100;// two decimal places


// CPU info 
const cpuType = cpus[0].model ; // CPU type

const numCores = cpus.length ; // number of cores

const cpuSpeed = cpus[0].speed ; // clock speed in MHz

const cpuLoad =  await getCpuLoad() ;

resolve( {
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
})
}); 


// console.log(osType); 
// console.log(upTime);
// console.log(freeMem) ;
// console.log(totalMem);
// console.log(memUsage);

// console.log(cpuType); 
// console.log(cpuSpeed);
// console.log(numCores); 
// console.log(cpus) ;


const  cpuAverage = ()=> {
    const cpus = os.cpus() ;

    let idleMs = 0 ; // idle milliseconds
    let totalMs = 0 ; // total milliseconds

    //loop through each logical core (threads) 
    cpus.forEach((aCore)=>{
        // loop through each property of the current core 
         for(mode in aCore.times){

            //we need all modes forthis core added to totalMs 
            totalMs += aCore.times[mode] ;
         }
         // we need idle mode for this ore added to idleMs 
         idleMs += aCore.times.idle ;
    }) ;

    return {
         idle: idleMs /cpus.length  ,
         total: totalMs / cpus.length  ,
        }
           
}   

// const run = async() => {
//     const data  = await performanceLoadData() ;
//     console.log(data) ;
// }
// run() ; 


