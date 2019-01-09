const Client = require('./testScript').sendRequest

Client("1","get","messages")
//Error 404
Client("2","post","messages","5000",{destination:"User1", message:"Hello World"})
//OK
Client("3","post","messages","5000",{destination:"User1", body:"Hello World"})
//Any response
Client("4","post","newPath","5000",{destination:"User1", message:"Hello World"})
//Error 404
Client("5","post","messages","5000",{destination:"", message:""})
//OK With empty fields, sometimes Error 500
Client("6","put","messages","5000",{destination:"User1", message:"Hello World"})
//Error 404
Client("7","post","messages","5000")
//Any response

let message;
for(let i=0;i<1000000;i++){
  message+="C"
}
Client("8","post","messages","100000",{destination:"User1", message})
//OK, sometimes Error 500
