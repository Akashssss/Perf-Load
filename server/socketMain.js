 // where socket.io listeners and (most) emitters 
 const socketMain= (io,pid) => {
    io.on("connection", (socket) => {
        let machineMacA =undefined;

        const auth = socket.handshake.auth; 
        console.log(auth);
        if(auth.token === "alfjl233l4nlkdlfjdsjkfl"){
            //valid node client
            console.log("valid node client")
            socket.join("nodeClient") ; //this client is a valid node client,put in a appropriate room 
        }else if ( auth.token==="wrefwe234fwdsfsd90mkls" ){
            //valid react client
            console.log("valid react client")
            socket.join("reactClient") ; //this client is a valid react client,put in a appropriate room
        }else
        {
            console.log("You have been disconnected")
            socket.disconnect();
            return ;  // disconnect invalid client

        }
           



        console.log("someone connected on worker "+process.pid);
        socket.emit("welcome" ,"welcome to our cluster driven socket io server") ;

        socket.on("perfData" ,(data)=> {
            console.log("tick..." ,pid,data.macA) ; 
            //console.log(data) ; 

            if(!machineMacA){
                machineMacA = data.macA ;
                io.to("reactClient").emit("connectedOrNot" , {machineMacA, isAlive:true})


            }

            io.to("reactClient").emit("perfData" ,data) ; 

        })
        

        socket.on("testConnection" ,(data)=>{
            console.log(data) 
        })
        // socket.on("secondTest" ,(data)=>{
        //     console.log(data) 
        // })
        socket.on("disconnect" ,(reason)=>{
            // a node client just disconnected , let  the frontend know !
            io.to("reactClient").emit("connectedOrNot" , {machineMacA, isAlive:false})
        })
    
    });






 }

 module.exports = socketMain; 